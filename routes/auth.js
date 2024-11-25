/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const router = Router()
const { crearUsuario } = require("../controllers/auth")

// Utilizando router para poder definir rutas en vez de app
// Registro de usuario
router.post("/new",crearUsuario );
// Login de usuario
router.post("/", (req, res) => {
  res.json({ ok: true, msg: "login" });
});
// Renovar token
router.get("/renew", (req, res) => {
  res.json({ ok: true, msg: "Renovando token" });
});

// Exportando para poder utilizarlo en el index.js
module.exports = router;