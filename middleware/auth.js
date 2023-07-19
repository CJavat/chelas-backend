/*
  * comprobar que vengan los header.authorization
  * sino -> return res.status(403).json({msg: "No hay una cambecera de autorizacion"})
  * si pasa, decodificar el jwt, obtener el id, y hacer que pueda hacer cambios. (EDITAR O ELIMINAR)
  * Puede agregar chelas el usuario, mientras este registrado, puede obtener las chelas, pero no modifcar las que no son suyas
  * o las que él no agregó.

*/
