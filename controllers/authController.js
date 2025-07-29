const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
const cookieParser = require('cookie-parser'); // Add cookie-parser for handling cookies

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // put this in .env ideally

// Register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'Utilisateur introuvable' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true only in production (HTTPS)
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Respond with success
    res.status(200).json({ message: 'Connexion réussie' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erreur serveur' });
  }
};
// Logout (client should handle token removal)
exports.logout = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logout successful' });
};
