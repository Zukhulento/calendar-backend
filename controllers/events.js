// Obteniendo response para obtener intelisense
const { response, request } = require("express");
const Evento = require("../models/EventoModel");

const getEventos = async (req, res = response) => {
  try {
    // En caso de querer más de un campo (En este caso más de name)
    // se agrega con un espacio en el mismo string "name email"
    const eventos = await Evento.find().populate("user", "name");
    return res.json({
      ok: true,
      eventos,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const crearEvento = async (req = request, res = response) => {
  const evento = new Evento(req.body);
  try {
    // Obteniendo el uid del usuario que crea el evento
    evento.user = req.uid;
    // Guardando el evento
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const actualizarEvento = async (req, res = response) => {
  // Obteniendo el id del evento objetivo mediante los params
  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento con ese id no existe",
      });
    }
    // Obteniendo uid de persona que actualiza el evento
    const uid = req.uid;
    if (uid !== evento.user.toString()) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para editar este evento",
      });
    }
    const nuevoEvento = { ...req.body, user: uid };
    // Actualizando el evento en la bd
    // Se agrega el tercer parametro para que devuelva el evento actualizado y no el previo
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    return res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento con ese id no existe",
      });
    }
    // Obteniendo uid de persona que actualiza el evento
    const uid = req.uid;
    if (uid !== evento.user.toString()) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para eliminar este evento",
      });
    }
    // const nuevoEvento = { ...req.body, user: uid };
    // Actualizando el evento en la bd
    // Se agrega el tercer parametro para que devuelva el evento actualizado y no el previo
    await Evento.findByIdAndDelete(eventoId);
    return res.json({
      ok: true,
      evento: "Evento eliminado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
