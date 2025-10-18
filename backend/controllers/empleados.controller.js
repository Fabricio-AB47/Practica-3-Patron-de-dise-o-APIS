const Empleado = require('../models/Empleado');
const mongoose = require('mongoose');
const empleadoCtrl = {};

// GET todos
empleadoCtrl.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find().lean();
    res.json(empleados);
  } catch (e) {
    console.error('[GET empleados] error:', e);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

// GET por id
empleadoCtrl.getEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'ID inválido' });
    const empleado = await Empleado.findById(id).lean();
    if (!empleado) return res.status(404).json({ error: 'No encontrado' });
    res.json(empleado);
  } catch (e) {
    console.error('[GET empleado] error:', e);
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
};

// POST crear
empleadoCtrl.createEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, departamento, sueldo } = req.body;
    if (!nombre || !cargo || !departamento || sueldo == null)
      return res.status(400).json({ error: 'Campos requeridos' });
    const s = Number(sueldo);
    if (Number.isNaN(s) || s < 0) return res.status(400).json({ error: 'Sueldo inválido' });
    const nuevo = await new Empleado({ nombre, cargo, departamento, sueldo: s }).save();
    res.status(201).json({ mensaje: 'Creado', empleado: nuevo });
  } catch (e) {
    console.error('[POST empleado] error:', e);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

// PUT actualizar
empleadoCtrl.editEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'ID inválido' });
    const { nombre, cargo, departamento, sueldo } = req.body;
    const actualizado = await Empleado.findByIdAndUpdate(
      id,
      { $set: { nombre, cargo, departamento, sueldo } },
      { new: true, runValidators: true }
    );
    if (!actualizado) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Actualizado', empleado: actualizado });
  } catch (e) {
    console.error('[PUT empleado] error:', e);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

// DELETE eliminar
empleadoCtrl.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'ID inválido' });
    const eliminado = await Empleado.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Eliminado' });
  } catch (e) {
    console.error('[DELETE empleado] error:', e);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};

module.exports = empleadoCtrl;
