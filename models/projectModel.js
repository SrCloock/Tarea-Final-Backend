const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
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
        enum: ['Activo', 'En Progreso', 'Completado']
    }
});

proyectoSchema.pre('save', async function (next) {
    try {
        if (!this.id) {
            const count = await this.constructor.countDocuments();
            this.id = count + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Proyecto = mongoose.model('Proyecto', proyectoSchema);

module.exports = Proyecto;
