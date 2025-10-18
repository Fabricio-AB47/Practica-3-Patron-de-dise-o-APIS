const mongoose = require('mongoose');
require('dotenv').config();

// Permite URI con o sin nombre de BD
// - Caso A: MONGODB_URI incluye /usuarios_db -> usamos ese nombre
// - Caso B: MONGODB_URI termina en / y MONGODB_DBNAME define el nombre (o 'usuarios_db' por defecto)
const rawUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/usuarios_db';
const cfgDbName = process.env.MONGODB_DBNAME; // opcional

let connectOptions = { autoIndex: true };
try {
  const url = new URL(rawUri);
  const hasDbInUri = url.pathname && url.pathname !== '/' && url.pathname.length > 1;
  if (!hasDbInUri) {
    connectOptions.dbName = cfgDbName || 'usuarios_db';
  }
} catch (_) {
  // Si falla el parser, no tocamos dbName; mongoose resolverá con la URI
}

mongoose
  .connect(rawUri, connectOptions)
  .then(() => {
    console.log(`[MongoDB] Conectado a BD: ${mongoose.connection.name}`);
  })
  .catch(err => {
    console.error('[MongoDB] Error de conexión:', err.message);
    process.exit(1);
  });

mongoose.connection.on('error', err => console.error('[MongoDB] error:', err));
mongoose.connection.on('disconnected', () => console.warn('[MongoDB] desconectado'));
