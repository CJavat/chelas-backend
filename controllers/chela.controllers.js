const obtenerChelas = (req, res, next) => {
  res.json({ msg: "Obtener chelas" });
};

const obtenerChela = (req, res, next) => {
  res.json({ msg: "Obtener chela" });
};

const registrarChela = (req, res, next) => {
  res.json({ msg: "Registrar Chela" });
};

const editarChela = (req, res, next) => {
  res.json({ msg: "Editar Chela" });
};

const eliminarChela = (req, res, next) => {
  res.json({ msg: "Eliminar Chela" });
};

module.exports = {
  obtenerChelas,
  obtenerChela,
  registrarChela,
  editarChela,
  eliminarChela,
};
