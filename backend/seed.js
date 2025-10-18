const mongoose = require('mongoose');
require('dotenv').config();
require('./database');
const Empleado = require('./models/Empleado');

async function run() {
  try {
    const mode = (process.env.SEED_MODE || 'reset').toLowerCase(); // 'reset' | 'append'
    const base = [
      { nombre: 'Ana', cargo: 'Analista', departamento: 'TI', sueldo: 1800 },
      { nombre: 'Luis', cargo: 'Desarrollador', departamento: 'TI', sueldo: 2200 },
      { nombre: 'María', cargo: 'RRHH', departamento: 'Recursos Humanos', sueldo: 1700 }
    ];
    if (mode === 'reset') {
      await Empleado.deleteMany({});
    }
    const creados = await Empleado.insertMany(base, { ordered: false });
    console.log(`[seed:${mode}] Creados:`, creados.map(e => e.nombre).join(', '));
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.connection.close();
  }
}

run();
