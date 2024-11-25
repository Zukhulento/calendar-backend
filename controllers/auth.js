const express = require("express");

const crearUsuario = (req, res = express.response) => {
  res.json({ ok: true, msg: "register" });
};

// Exportando controlador de creación de usuario
module.exports = {
  crearUsuario,
};
