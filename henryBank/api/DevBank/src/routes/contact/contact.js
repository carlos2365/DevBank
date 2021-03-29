const server = require("express").Router();
const { Contact, User, Account } = require("../../database/db");

//se crea un contacto
server.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;
  const verificar = await Contact.findOne({ where: { email, userId: id } });

  if (verificar) {
    res.send("ya es un contacto");
  } else {
    try {
      const contact = await User.findOne({
        where: { email },
        include: { model: Account },
      }); //Busca el contacto
      console.log(contact);
      console.log(contact.accounts);
      const result = await Contact.create({
        alias: contact.name, // Se nombra por defecto.
        email: contact.email,
        userId: id,
        mobile: contact.phone,
        cvu_pesos: contact.accounts[0].cvu,
        cvu_dolares: contact.accounts[1].cvu,

        contactId: contact.id,
      });
      res.status(201).json(result); //devuelve el contacto creado.
    } catch (error) {
      next(error);
    }
  }
});

// server.post("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const { email } = req.body;
//   try {
//     const contact = await User.findOne({
//       where: { email },
//       include: { model: Account },
//     }); //Busca el contacto
//     console.log(contact);
//     console.log(contact.accounts);
//     const result = await Contact.create({
//       alias: contact.name, // Se nombra por defecto.
//       email: contact.email,
//       userId: id,
//       mobile: contact.phone,
//       cvu_pesos: contact.accounts[0].cvu,
//       cvu_dolares: contact.accounts[1].cvu,
//       contactId: contact.id,
//     });
//     res.status(201).json(result); //devuelve el contacto creado.
//   } catch (error) {
//     next(error);
//   }
// });

// Borrar un contacto.
server.delete("/:id/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const { contactId } = req.params;
  try {
    const result = await Contact.destroy({
      //elimina el contacto.
      where: { userId: id, contactId },
    });
    if (result) {
      //si lo encuentra devuelve 201
      res.status(201).json({ Msj: "El contacto se elimino" });
    } else {
      //sino 404
      res.status(404).json({ MsjError: "No existe el contacto" });
    }
  } catch (error) {
    next(error);
  }
});

//Buscar un contacto y sus movimientos en comun

server.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  //const { contactId } = req.body;
  try {
    const contact = await Contact.findAll({
      where: { userId: id },
    });
    if (contact) {
      res.status(200).send(contact);
    } else {
      res.status(404).json({ MsjError: "Contacto no encontrado" });
    }
  } catch (error) {
    next(error);
  }
});

//Cambiar el nombre de un contacto
server.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { contactId, alias } = req.body;
  try {
    const contact = await Contact.update(
      //Cambia el nombre al contacto
      { alias },
      {
        where: { userId: id, contactId },
      }
    );
    if (contact) {
      res.status(200).send(contact); //devuelve el contacto modificado.
    } else {
      res.status(404).json({ MsjError: "No existe el contacto" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = server;
