const express = require('express');
const router = express.Router();
const instrutorController = require('../controllers/instrutorController');


router('/', instrutorController.listar);
router('/', instrutorController.criar);
router('/:id', instrutorController.editar);
router('/:id', instrutorController.excluir);

modules.export = router;