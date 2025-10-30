const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// rutas
app.use("/users", require("./routes/users"));

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server corriendo en el Puerto ${PORT}`);
  });
}

module.exports = app; // importante para que Supertest pueda importar la app
