const AutModel = require("../models/aut.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");

const iniciarSesion = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userEncontrado = await AutModel.findOne({ email });

    //* Check if user already exists
    if (!userEncontrado) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    //* Check if password is correct
    if (!(await bcrypt.compare(password, userEncontrado.password))) {
      return res.status(400).json({ msg: "Password Incorrecto" });
    }

    //* ACTUALIZAR EL TOKEN
    const idToken = shortId.generate();

    const token = jwt.sign(
      {
        id: userEncontrado._id.toString(),
        email: userEncontrado.email,
        idToken,
      },
      process.env.LLAVE_SECRETA,
      { expiresIn: "90d" }
    );

    userEncontrado.token = token;
    await userEncontrado.save();

    return res
      .status(200)
      .json({ msg: "Autenticaión Correcta", userEncontrado });
  } catch (error) {
    return res.status(400).json({ msg: `Ocurrió un error: ${error.message}` });
  }
};

const registrarse = async (req, res, next) => {
  const errores = [];

  try {
    const ValidacionEmail = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "g"
    );
    const validacionNombre = new RegExp(/^[a-zA-Z]{3,25}$/);
    const validacionApellido = new RegExp(/^[a-zA-Z]{3,25}$/);
    const validacionPassword = new RegExp(/^([a-zA-Z0-9]){7,15}$/);

    if (!validacionNombre.test(req.body.nombre)) {
      errores.push("El NOMBRE es inválido");
    }
    if (!validacionApellido.test(req.body.apellido)) {
      errores.push("El APELLIDO es inválido");
    }
    if (!ValidacionEmail.test(req.body.email)) {
      errores.push("El EMAIL es inválido");
    }
    if (!validacionPassword.test(req.body.password)) {
      errores.push("El PASSWORD es inválido");
    }

    if (errores.length > 0) {
      return res.status(200).json({ msg: errores });
    }

    //* Guardar usuario
    await AutModel.create(req.body);

    return res.status(200).json({ msg: "Registro Exitoso" });
  } catch (error) {
    const arrayErrors = [];

    //! SHOW ERRORES.
    if (error.errors) {
      error.errors.nombre?.properties.type === "required" &&
        arrayErrors.push("El NOMBRE es obligatorio");
      error.errors.apellido?.properties.type === "required" &&
        arrayErrors.push("El APELLIDO es obligatorio");
      error.errors.password?.properties.type === "required" &&
        arrayErrors.push("El PASSWORD es obligatorio");
      error.errors.email?.properties.type === "required" &&
        arrayErrors.push("El EMAIL es obligatorio");
    }

    error.code === 11000 && arrayErrors.push("El EMAIL ya está registrado");

    console.log(error);
    return res.status(400).json({ msg: arrayErrors });
  }
};

const editarPerfil = async (req, res, next) => {
  try {
    const { id, nombre, apellido, password } = req.body;

    const usuarioEncontrado = await AutModel.findById(id);

    if (!usuarioEncontrado) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (nombre) {
      usuarioEncontrado.nombre = nombre;
    }

    if (apellido) {
      usuarioEncontrado.apellido = apellido;
    }

    if (password) {
      usuarioEncontrado.password = password;
    }

    await usuarioEncontrado.save();

    return res
      .status(200)
      .json({ msg: "Tus datos se han actualizado correctamente" });
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ msg: `Ha Ocurrido un error: ${error.message}` });
  }
};

const eliminarPerfil = async (req, res, next) => {
  try {
    const { email } = req.body;

    const usuarioEncontrado = await AutModel.findOne({ email });

    if (!usuarioEncontrado || usuarioEncontrado.length === 0) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }

    await usuarioEncontrado.deleteOne();

    return res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ msg: `Ha Ocurrido un error: ${error.message}` });
  }
};

module.exports = {
  iniciarSesion,
  registrarse,
  editarPerfil,
  eliminarPerfil,
};
