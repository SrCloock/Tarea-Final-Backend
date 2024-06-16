const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Pendiente', 'En Progreso', 'Completada']
    },
    proyectoId: {
        type: Number,
        required: true
    },
    usuarioId: {
        type: Number,
        required: true
    }
});

tareaSchema.pre('save', async function(next) {
    if (!this.id) {
        const count = await mongoose.model('Tarea').countDocuments();
        this.id = count + 1;
    }
    next();
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;
