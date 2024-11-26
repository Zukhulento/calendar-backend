const express = require("express");
// Utilizando dotenv para variables de entorno
require("dotenv").config();
// Configuración de base de datos
const { dbConnection } = require("./database/config");
// Importando CORS
const cors = require("cors");

// Desestructurando variables de entorno
const { LOCALPORT } = process.env;

// Instanciando la app de express (Esto es mi servidor)
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Middleware
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

//* Rutas
// auth
app.use("/api/auth", require("./routes/auth"));
// CRUD: Eventos
app.use("/api/events", require("./routes/events"));

// Manteniendo servidor activo y configurado en el puerto dado
app.listen(LOCALPORT, () => {
  console.log(`Server running on port ${LOCALPORT}`);
});
