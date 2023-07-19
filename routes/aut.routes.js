const express = require("express");
const router = express.Router();

//* OBTENER CONTROLADORES
const {
  iniciarSesion,
  registrarse,
  editarPerfil,
  eliminarPerfil,
} = require("../controllers/aut.controllers");

router.post("/iniciar-sesion", iniciarSesion);

router.post("/registarse", registrarse);

router.put("/editar-perfil", editarPerfil);

router.delete("/eliminar-perfil", eliminarPerfil);

module.exports = router;
