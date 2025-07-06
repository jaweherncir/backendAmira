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

module.exports = router;
