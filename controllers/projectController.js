const Proyecto = require('../models/projectModel');

let proyectoIdCounter = 1;

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find();
        res.status(200).json(proyectos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerProyectoPorId = async (req, res) => {
    try {
        const proyecto = await Proyecto.findOne({ id: req.params.id });
        if (!proyecto) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.status(200).json(proyecto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.crearProyecto = async (req, res) => {
    try {
        const { nombre, descripcion, fechaInicio, fechaFin, estado } = req.body;
        
        const nuevoProyecto = new Proyecto({
            id: proyectoIdCounter++,
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            estado
        });
        
        await nuevoProyecto.save();
        res.status(201).json(nuevoProyecto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.actualizarProyecto = async (req, res) => {
    try {
        const proyectoActualizado = await Proyecto.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        
        if (!proyectoActualizado) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        
        res.status(200).json(proyectoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.eliminarProyecto = async (req, res) => {
    try {
        const proyectoEliminado = await Proyecto.findOneAndDelete({ id: req.params.id });
        if (!proyectoEliminado) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        
        res.status(200).json({ message: 'Proyecto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
