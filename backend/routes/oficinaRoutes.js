const express = require('express');
const router = express.Router();
const oficinaController = require('../controllers/oficinaController');


router('/', oficinaController.listar);
router('/', oficinaController.criar);
router('/:id', oficinaController.editar);
router('/:id', oficinaController.excluir);

modules.export = router;