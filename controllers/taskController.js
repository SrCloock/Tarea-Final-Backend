const Task = require('../models/taskModel');
const enviarCorreo = require('../services/emailService');

exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Task.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerTareaPorId = async (req, res) => {
    try {
        const tarea = await Task.findOne({ id: req.params.id });
        if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.crearTarea = async (req, res) => {
    try {
        const { nombre, descripcion, fechaInicio, fechaFin, estado, proyectoId, usuarioId } = req.body;
        
        const nuevaTarea = new Task({ nombre, descripcion, fechaInicio, fechaFin, estado, proyectoId, usuarioId });
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.actualizarTarea = async (req, res) => {
    try {
        const tareaActualizada = await Task.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!tareaActualizada) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.eliminarTarea = async (req, res) => {
    try {
        const tareaEliminada = await Task.findOneAndDelete({ id: req.params.id });
        if (!tareaEliminada) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.status(200).json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.añadirUsuarioATarea = async (req, res) => {
    const { tareaId, usuarioId } = req.params;

    try {
        const tarea = await Task.findById(tareaId).populate('usuarios');
        if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });

        tarea.usuarios.push(usuarioId);
        await tarea.save();

        const usuario = { nombre: 'Nombre del Usuario', email: 'correo@example.com' };
        const asunto = 'Nueva tarea añadida';
        const cuerpo = `Se te ha añadido a una nueva tarea:\n\nNombre de la tarea: ${tarea.nombre}\nDescripción: ${tarea.descripcion}\nFecha de inicio: ${tarea.fechaInicio}\nFecha de fin: ${tarea.fechaFin}`;
        
        await enviarCorreo(usuario.email, asunto, cuerpo);

        res.status(200).json({ message: 'Usuario añadido correctamente a la tarea y correo enviado' });
    } catch (error) {
        console.error('Error al añadir usuario a la tarea:', error);
        res.status(500).json({ error: 'Hubo un problema al procesar la solicitud' });
    }
};

exports.eliminarUsuarioDeTarea = async (req, res) => {
    const { tareaId, usuarioId } = req.params;

    try {
        const tarea = await Task.findById(tareaId).populate('usuarios');
        if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });

        const index = tarea.usuarios.indexOf(usuarioId);
        if (index > -1) {
            tarea.usuarios.splice(index, 1);
            await tarea.save();
        }

        const usuario = { nombre: 'Nombre del Usuario', email: 'correo@example.com' };
        const asunto = 'Usuario eliminado de tarea';
        const cuerpo = `Se te ha eliminado de la siguiente tarea:\n\nNombre de la tarea: ${tarea.nombre}\nDescripción: ${tarea.descripcion}\nFecha de inicio: ${tarea.fechaInicio}\nFecha de fin: ${tarea.fechaFin}`;
        
        await enviarCorreo(usuario.email, asunto, cuerpo);

        res.status(200).json({ message: 'Usuario eliminado correctamente de la tarea y correo enviado' });
    } catch (error) {
        console.error('Error al eliminar usuario de la tarea:', error);
        res.status(500).json({ error: 'Hubo un problema al procesar la solicitud' });
    }
};
