const express = require("express");
const router = express.Router();

// Dummy store mínima para la práctica
const USERS = [{ id: "U001", username: "admin" }];

// GET /users -> todos
router.get("/", (_req, res) => {
  return res.json({ message: "Todos los usuarios enviados", data: USERS });
});

// GET /users/:id -> uno por id
router.get("/:id", (req, res) => {
  if (req.params.id === "U001") {
    return res.json("Usuario 001 correcto");
  }
  return res.status(404).json("Usuario no encontrado");
});

// POST /users -> crear
router.post("/", (req, res) => {
  const { username, password } = req.body || {};
  if (username && password) {
    USERS.push({ id: `U${String(USERS.length + 1).padStart(3, "0")}`, username });
    return res.status(201).json("Usuario creado");
  }
  return res.status(400).json("Usuario no creado");
});

module.exports = router;
