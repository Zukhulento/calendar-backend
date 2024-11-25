const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
  // Obteniendo errores de validación
  const errors = validationResult(req);
  //   Si los errores no están vacíos se hace un return con un status 400 y se envía un json con los errores
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = {
  validarCampos,
};
