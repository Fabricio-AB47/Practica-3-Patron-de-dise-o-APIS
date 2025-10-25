const { Schema, model } = require('mongoose');

const departamentoSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    slogan: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = model('Departamento', departamentoSchema);
