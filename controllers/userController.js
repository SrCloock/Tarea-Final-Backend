const Usuario = require('../models/userModel');

let userIdCounter = 1;

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios.map(usuario => ({
            userId: usuario.userId,
            nombre: usuario.nombre,
            email: usuario.email
        })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ userId: req.params.id });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({
            userId: usuario.userId,
            nombre: usuario.nombre,
            email: usuario.email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, email } = req.body;
        
        const nuevoUsuario = new Usuario({ nombre, email });
        
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json({
            userId: usuarioGuardado.userId,
            nombre: usuarioGuardado.nombre,
            email: usuarioGuardado.email
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findOneAndUpdate({ userId: req.params.id }, req.body, { new: true });
        if (!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({
            userId: usuarioActualizado.userId,
            nombre: usuarioActualizado.nombre,
            email: usuarioActualizado.email
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findOneAndDelete({ userId: req.params.id });
        if (!usuarioEliminado) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
