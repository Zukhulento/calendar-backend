const express = require("express");
// Utilizando dotenv para variables de entorno
require("dotenv").config();

// Desestructurando variables de entorno
const { LOCALPORT } = process.env;

// Instanciando la app de express (Esto es mi servidor)
const app = express();

// Middleware
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

//* Rutas
// auth
app.use("/api/auth", require("./routes/auth"));
// CRUD: Eventos

// Manteniendo servidor activo y configurado en el puerto dado
app.listen(LOCALPORT, () => {
  console.log(`Server running on port ${LOCALPORT}`);
});
