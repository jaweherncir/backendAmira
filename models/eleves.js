const mongoose = require('mongoose');

const eleveSchema = new mongoose.Schema({
  classe: {
    type: String,
    required: true,
    enum: ['7ème', '8ème', '9ème', '1er', '2éme', '3éme', 'bac']
  },
  matricule: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  sexe: {
    type: String,
    required: true,
    enum: ['Masculin', 'Féminin']
  },
  dateNaissance: {
    type: Date,
    required: true
  },
  lieuNaissance: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  nompere: {
    type: String,
    required: true
  },
  nomMere: {
    type: String,
    required: true
  },
  payee: {
    type: Boolean,
    default: true
  },
  inscrit: {
    type: Boolean,
    default: true
  },
  qrcode: {
    type: String,
    required: true
  },

  // ✅ New fields:
  typePaiement: {
    type: String,
    enum: ['mois', 'semestre', 'année'],
    required: true
  },
  dateDebutPaiement: {
    type: Date,
    required: true
  },
  dateFinPaiement: {
    type: Date,
    required: true
  }
  ,
  montantPaiement: {
    type: Number,
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Eleve', eleveSchema);
