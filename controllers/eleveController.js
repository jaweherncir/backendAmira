const Eleve = require('../models/eleves'); // Make sure the path is correct
const QRCode = require('qrcode'); // Import QRCode package

// Créer un nouvel Eleve
exports.createEleve = async (req, res) => {
  try {
    const {
      classe,
      matricule,
      nom,
      prenom,
      sexe,
      dateNaissance,
      lieuNaissance,
      adresse,
      telephone,
      email,
      nompere,
      nomMere,
      payee,
      inscrit,
      typePaiement,
      dateDebutPaiement,
      dateFinPaiement,
      montantPaiement
    } = req.body;

    // Générer le contenu pour le QR code
    const qrcodeData = `${nom} ${prenom} - ${email}`;
    const qrCode = await QRCode.toDataURL(qrcodeData);

    // Créer une nouvelle instance d'Eleve avec toutes les données
    const newEleve = new Eleve({
      classe,
      matricule,
      nom,
      prenom,
      sexe,
      dateNaissance,
      lieuNaissance,
      adresse,
      telephone,
      email,
      nompere,
      nomMere,
      payee: payee !== undefined ? payee : true,
      inscrit: inscrit !== undefined ? inscrit : true,
      typePaiement,
      dateDebutPaiement,
      dateFinPaiement,
      qrcode: qrCode,
      montantPaiement
    });

    // Sauvegarder dans la base de données
    await newEleve.save();

    res.status(201).json({ message: 'Élève créé avec succès', eleve: newEleve });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Obtenir tous les Eleves
exports.getAllEleves = async (req, res) => {
  try {
    const eleves = await Eleve.find(); // Récupérer tous les Eleves de la base de données
    res.status(200).json(eleves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir un Eleve par ID
exports.getEleveById = async (req, res) => {
  try {
    const eleve = await Eleve.findById(req.params.id); // Récupérer un Eleve par ID
    if (!eleve) return res.status(404).json({ message: 'Élève introuvable' });
    res.status(200).json(eleve);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un Eleve par ID
exports.updateEleveById = async (req, res) => {
  try {
    const updatedEleve = await Eleve.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // Retourner le document mis à jour et valider la mise à jour
    );
    if (!updatedEleve) return res.status(404).json({ message: 'Élève introuvable' });
    res.status(200).json({ message: 'Élève mis à jour avec succès', eleve: updatedEleve });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un Eleve par ID
exports.deleteEleveById = async (req, res) => {
  try {
    const deletedEleve = await Eleve.findByIdAndDelete(req.params.id); // Supprimer un Eleve par ID
    if (!deletedEleve) return res.status(404).json({ message: 'Élève introuvable' });
    res.status(200).json({ message: 'Élève supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les Eleves ayant "payee" == true
exports.getAllElevesPayee = async (req, res) => {
  try {
    const elevesPayee = await Eleve.find({ payee: true }); // Récupérer tous les Eleves ayant "payee" égal à true
    res.status(200).json(elevesPayee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
