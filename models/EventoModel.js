const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});
//? Esto me sirve para establecer el formato de mi modelo sin afectar la bd
// Utilizando el método toJSON para modificar la respuesta
EventoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model("Evento", EventoSchema);
