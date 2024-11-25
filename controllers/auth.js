// Obteniendo response para obtener intelisense
const { response } = require("express");

// Controlador de creación de usuario
const crearUsuario = (req, res = response) => {
  const { email, password, name } = req.body;
  res.status(201).json({ ok: true, msg: "registro", email, password, name });
};
// Controlador de login de usuario
const loginUsuario = (req, res = response) => {
  const { email, password } = req.body;
  res.json({ ok: true, msg: "login" });
};

// Controlador de revalidación de token de usuario
const revalidarUsuario = (req, res = response) => {
  res.json({ ok: true, msg: "Renovando token" });
};
// Exportando controlador de creación de usuario
module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarUsuario,
};
