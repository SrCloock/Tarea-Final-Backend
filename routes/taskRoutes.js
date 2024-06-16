const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.obtenerTareas);
router.get('/:id', taskController.obtenerTareaPorId);
router.post('/', taskController.crearTarea);
router.put('/:id', taskController.actualizarTarea);
router.delete('/:id', taskController.eliminarTarea);

router.put('/:tareaId/usuarios/:usuarioId', taskController.añadirUsuarioATarea);

module.exports = router;
