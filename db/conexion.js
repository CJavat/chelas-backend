const mongoose = require("mongoose");

const bd = mongoose
  .connect(`mongodb+srv://${process.env.BD}`)
  .then(() => console.log("Conexión exitosa con la base de datos"))
  .catch((error) => console.error(`Ocurrió un error al conectarse ${error}`));

module.exports = bd;
