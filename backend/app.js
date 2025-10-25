const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
// GraphQL
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');

// settings
app.set('puerto', process.env.PORT || 3000);
app.set('nombreApp', 'Gestión de empleados');

// middlewares
app.use(morgan('dev'));
// CORS abierto para desarrollo (evita bloqueos al usar puertos dinámicos)
// Si quieres restringir, reemplaza por cors({ origin: process.env.FRONTEND_URL || 'http://localhost:4200' })
app.use(cors());
app.use(express.json());

// rutas
app.get('/', (req, res) => {
  res.send(`API ${app.get('nombreApp')} lista. Endpoints: /api/empleados`);
});
app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/health/db', (_req, res) => {
  const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  res.json({
    connected: state === 1,
    state,
    dbName: mongoose.connection.name || null
  });
});
app.use('/api/empleados', require('./routes/empleados.routes'));

// mount GraphQL endpoint at /graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
  })
);

module.exports = app;
