// Obteniendo response para obtener intelisense
const { response } = require("express");
// Importando bcrypt
const bcrypt = require("bcryptjs");
// Importando modelo
const Usuario = require("../models/UsuarioModel");
// Importando jwt
const { generarJWT } = require("../helpers/jwt");

// Controlador de creación de usuario
const crearUsuario = async (req, res = response) => {
  try {
    const { email, password, name } = req.body;
    // Verificando si el usuario ya existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res
        .status(400)
        .json({ ok: false, msg: "Este correo ya está registrado" });
    }
    usuario = new Usuario(req.body);
    //* Encriptación de contraseña
    // Generando salt
    const salt = bcrypt.genSaltSync();
    // Encriptando contraseña
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      msg: "Usuario registrado",
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "No se logró registrar su usuario" });
  }
};
// Controlador de login de usuario
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificando si el usuario ya existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res
        .status(400)
        .json({ ok: false, msg: "El usuario no existe con ese email" });
    }
    // Verificando contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.json({ ok: false, msg: "Credenciales incorrectas" });
    }
    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Por favor, hable con el administrador" });
  }
};

// Controlador de revalidación de token de usuario
const revalidarUsuario = async (req, res = response) => {
  try {
    // Esta uid ya está disponible porque se obtiene del middleware
    const { uid, name } = req;
    // Generar JWT
    const token = await generarJWT(uid, name);
    res.json({ ok: true, token });
  } catch (error) {
    res
      .status(500)
      .json({ ok: true, msg: "Por favor, hable con el administrador" });
  }
};
// Exportando controlador de creación de usuario
module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarUsuario,
};
