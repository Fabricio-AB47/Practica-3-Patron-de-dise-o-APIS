const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/usuarios_db';

// Schema flexible since we don't know exact fields (use collection name 'empleados')
const EmpleadoSchema = new mongoose.Schema({}, { strict: false, collection: 'empleados' });
const Empleado = mongoose.model('Empleado', EmpleadoSchema);

(async () => {
  try {
    await mongoose.connect(uri, { autoIndex: false });
    console.log('Conectado a MongoDB ->', uri);
    const docs = await Empleado.find().limit(200).lean();
    console.log(`Encontrados ${docs.length} documentos en colección 'empleados':`);
    console.log(JSON.stringify(docs, null, 2));
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
