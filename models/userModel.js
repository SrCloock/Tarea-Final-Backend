const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

usuarioSchema.pre('save', async function (next) {
    try {
        if (!this.userId) {
            const count = await Usuario.countDocuments();
            this.userId = count + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
