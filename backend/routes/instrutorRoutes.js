const express = require('express');
const router = express.Router();
const instrutorController = require('../controllers/instrutorController');


router.get('/', instrutorController.listar);
router.post('/', instrutorController.criar);
router.put('/:id', instrutorController.editar);
router.delete('/:id', instrutorController.excluir);

module.exports = router;