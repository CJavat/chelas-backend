const jwt = require("jsonwebtoken");
const moment = require("moment");

const autenticacion = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).json({
        msg: "No se envió ningún token de autorización",
      });
    }

    const tokenId = req.headers.authorization.split(" ")[1];

    const tokenDecodificado = jwt.decode(tokenId, process.env.LLAVE_SECRETA);

    if (tokenDecodificado.exp <= moment().unix()) {
      return res.status(403).json({
        msg: "El token ha expirado, inicia sesión otra vez",
        tokenExpirado: true,
      });
    }

    req.usuario = tokenDecodificado;

    next();
  } catch (error) {
    return res.status(200).json({ msg: `Ocurrió un error: ${error.message}` });
  }
};

module.exports = { autenticacion };
