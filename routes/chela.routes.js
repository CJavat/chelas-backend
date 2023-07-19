const express = require("express");
const router = express.Router();

//* OBTENER CONTROLADORES
const {
  obtenerChelas,
  obtenerChela,
  registrarChela,
  editarChela,
  eliminarChela,
} = require("../controllers/chela.controllers");

router.get("/obtener-chelas", obtenerChelas);

router.get("/obtener-chela", obtenerChela);

router.post("/registar-chela", registrarChela);

router.put("editar-chela", editarChela);

router.delete("/eliminar-chela", eliminarChela);

module.exports = router;
