const express = require('express');
const app = express();

// Use process.env.PORT when available so this file can be used in different envs
const port = process.env.PORT || 3009;

app.get('/', (req, res) => {
  res.send('Servidor express');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});