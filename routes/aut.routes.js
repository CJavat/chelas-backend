const express = require("express");
const router = express.Router();

//* OBTENER CONTROLADORES
const {
  iniciarSesion,
  registrarse,
  editarPerfil,
  eliminarPerfil,
} = require("../controllers/aut.controllers");

//* IMPORTAR MIDDLEWARES
const { autenticacion } = require("../middleware/auth");

router.post("/iniciar-sesion", iniciarSesion);

router.post("/registrarse", registrarse);

router.put("/editar-perfil/:idUsuario", autenticacion, editarPerfil);

router.delete("/eliminar-perfil", autenticacion, eliminarPerfil);

module.exports = router;
