/*
    Rutas de usuarios / Events
    host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();

// Obtener eventos
router.get("/", getEventos);

// Crear nuevo evento
router.post("/",[check("title", "El titulo es obligatorio").not().isEmpty(), validarCampos], crearEvento);

// Actualizar evento
router.put("/:id", actualizarEvento);

// Eliminar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
