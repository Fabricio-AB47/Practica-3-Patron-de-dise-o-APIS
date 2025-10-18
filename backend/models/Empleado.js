const { Schema, model } = require('mongoose');

const empleadoSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    cargo: { type: String, required: true, trim: true },
    departamento: { type: String, required: true, trim: true },
    sueldo: { type: Number, required: true, min: 0 }
  },
  { timestamps: true, versionKey: false }
);

// Forzar colección exacta 'empleados' en la BD 'usuarios_db'
module.exports = model('Empleado', empleadoSchema, 'empleados');
