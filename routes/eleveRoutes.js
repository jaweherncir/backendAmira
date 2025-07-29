const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');

// Create a new Eleve
router.post('/', eleveController.createEleve);

// Get all Eleves
router.get('/', eleveController.getAllEleves);

// Get Eleve by ID
router.get('/:id', eleveController.getEleveById);

// Update Eleve by ID
router.put('/:id', eleveController.updateEleveById);

// Delete Eleve by ID
router.delete('/:id', eleveController.deleteEleveById);
router.put('/:id/mark-paid',eleveController.markEleveAsPayee);
router.get('/somme/mois', eleveController.getTotalPaiementMois);
router.get('/somme/semestre', eleveController.getTotalPaiementSemestre);
router.get('/somme/annee', eleveController.getTotalPaiementAnnee);

module.exports = router;
