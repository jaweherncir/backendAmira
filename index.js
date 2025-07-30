const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const cookieParser = require('cookie-parser');
const eleveRoutes = require('./routes/eleveRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies
app.use(cors({
  origin: 'http://localhost:4000', // Replace with your front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Enable credentials if you need to send cookies in requests
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/eleves', eleveRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ DB Error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
