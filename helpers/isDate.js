const moment = require("moment");

const isDate = (value, { req, res, path }) => {
  // Con esta validación se le dice al express validator que no se pasó
  if (!value) return false;
  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
