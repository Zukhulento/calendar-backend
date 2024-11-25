/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  crearUsuario,
  loginUsuario,
  revalidarUsuario,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos")

// Utilizando router para poder definir rutas en vez de app
// Registro de usuario
router.post(
  "/new",
  [
    // Validaciones
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos
  ],
  crearUsuario
);
// Login de usuario
router.post(
  "/",
  [
    // Validaciones
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos
  ],
  loginUsuario
);
// Renovar token
router.get("/renew", revalidarUsuario);

// Exportando para poder utilizarlo en el index.js
module.exports = router;
