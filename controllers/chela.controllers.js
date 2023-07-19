const obtenerChelas = (req, res, next) => {
  res.json({ msg: "Obtener chelas" });
};

const obtenerChela = (req, res, next) => {
  res.json({ msg: "Obtener chela" });
};

const registrarChela = (req, res, next) => {
  tokenId = req.headers.authorization.split(" ")[1];
  const { id, nombre, marca, tipo, gradosAlcohol, precio } = req.body;

  console.log(`Token: ${tokenId}`);
  console.log(
    `Datos Body: ${id}, ${nombre}, ${marca}, ${tipo}, ${gradosAlcohol}, ${precio}`
  );
  //TODO: TERMINAR.
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

//! ----------------- NOTA -----------------
/*
  !ENTRAR A LA PÁGINA: https://github.com/CJavat/curso-react-udemy/blob/master/16-proyecto4/api-rest-red-social/middlewares/auth.js
  !PARA VER EL EJEMPLO DE COMO OBTENER LOS HEADERS (AUTHOIZATION) PARA VALIDAR EL USUARIO QUE HACE LOS CAMBIOS.
*/
