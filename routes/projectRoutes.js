const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.obtenerProyectos);
router.get('/:id', projectController.obtenerProyectoPorId);
router.post('/', projectController.crearProyecto);
router.put('/:id', projectController.actualizarProyecto);
router.delete('/:id', projectController.eliminarProyecto);

module.exports = router;
