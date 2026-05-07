const express = require('express');
const router = express.Router();
const oficinaController = require('../controllers/oficinaController');


router.get('/', oficinaController.listar);
router.post('/', oficinaController.criar);
router.put('/:id', oficinaController.editar);
router.delete('/:id', oficinaController.excluir);

module.exports = router;