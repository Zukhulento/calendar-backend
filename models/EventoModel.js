const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
    require: true,
  },
  notes: {
    type: String,
    require: true,
  },
  start: {
    type: String,
    require: true,
  },
  end: {
    type: String,
    require: true,
  },
  bgColor: {
    type: String,
    require: true,
  },
  user: {
    id: {type:String, require:true},
    name: {type:String, require:true}
  },
});
module.exports = model("Evento", EventoSchema);
