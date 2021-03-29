const server = require("express").Router();
const userController = require("../../controllers/transfer.controller");
const { User, Account, Transfer } = require("../../database/db");
const axios = require("axios");
// const passport = require("passport");
// const bcrypt = require("bcryptjs");

server.post("/transfer", function (req, res) {
  // recibo destination del que manda y del que recive, junto con el value
  //
  console.log("sassadpaso por todos esos");
  const { origin, destination, value, type, currency, description } = req.body;
  console.log("currency: ", currency);
  // validaciones
  if (type !== "TRANSFER" && type !== "DEP" && type !== "EXT") {
    return res.send({ msg: "El valor de tipo de operacion es incorrecto." });
  }

  if (currency !== "PESOS" && currency !== "USD") {
    return res.send({ msg: "El valor de moneda es incorrecto." });
  }

  if (value < 0 || typeof value !== "number" || isNaN(parseFloat(value))) {
    return res.send({ msg: "El formato de valor es incorrecto." });
  }

  if (
    isNaN(parseInt(origin)) ||
    isNaN(parseInt(destination)) ||
    typeof origin !== "number" ||
    typeof destination !== "number"
  ) {
    let errorName = "";

    if (isNaN(parseInt(origin)) || typeof origin !== "number")
      errorName = "origen";
    else errorName = "destino";
    return res.send({ msg: `El formato de ${errorName} es incorrecto.` });
  }
  console.log("paso por todos esos");

  Account.findOne({ where: { cvu: origin } })
    .then((response) => {
      if (response.dataValues.balance >= value) {
        var cantidad = response.dataValues.balance - value;
        Account.update({ balance: cantidad }, { where: { cvu: origin } })
          .then((responseA) => {
            return Account.findOne({ where: { cvu: destination } });
          })
          .then((responseB) => {
            // console.log("AAAAAAAAAAAAA 3")
            var cantidadRecive = responseB.dataValues.balance - 1 + value + 1;
            return Account.update(
              { balance: cantidadRecive },
              { where: { cvu: destination } }
            );
          })
          .then((responseC) => {
            //crear modelo trasfer para registrar estas transferencias.
            // console.log("AAAAAAAAAAAAA 4")
            Transfer.create({
              origin,
              destination,
              value,
              type,
              currency,
              description,
            });
          })
          .then((responseD) => {
            res.send("transferencia realizada con exito");
          })
          .catch((err) => {
            // console.log("AAAAAAAAAAAAA ERR")
            // console.log("HUBO ERROR EN LA TRANSACCION")
            return err;
          });
      } else {
        // console.log("ENTRO AL ELSE")
        res.send(
          "la cuenta de origen no cuenta con saldo suficiente para realizar esta transferencia"
        );
      }
    })
    .catch((err) => {
      console.log("HUBO ERROR EN LA TRANSACCION", err);
      res.send(err);
    });
});

server.post("/dolar", function (req, res) {
  var { origin, destination, value, type, currency, description } = req.body;

  // validaciones
  if (
    type !== "TRANSFER" &&
    type !== "DEP" &&
    type !== "EXT" &&
    type !== "COMPRA-USD" &&
    type !== "VENTA-USD"
  ) {
    return res.send({ msg: "El valor de tipo de operacion es incorrecto." });
  }

  if (currency !== "PESOS" && currency !== "USD") {
    return res.send({ msg: "El valor de moneda es incorrecto." });
  }

  if (value < 0 || typeof value !== "number" || isNaN(parseFloat(value))) {
    return res.send({ msg: "El formato de valor es incorrecto." });
  }

  if (
    isNaN(parseInt(origin)) ||
    isNaN(parseInt(destination)) ||
    typeof origin !== "number" ||
    typeof destination !== "number"
  ) {
    let errorName = "";

    if (isNaN(parseInt(origin)) || typeof origin !== "number")
      errorName = "origen";
    else errorName = "destino";
    return res.send({ msg: `El formato de ${errorName} es incorrecto.` });
  }
  console.log("paso por todos esos");
  var compra;
  var venta;
  axios
    .get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then((response) => {
      compra = parseFloat(response.data[0].casa.compra).toFixed(2);
      venta = parseFloat(response.data[0].casa.venta).toFixed(2);
      var moneda;
      venta = venta * 1.3 * 1.35;
      if (type == "COMPRA-USD") {
        moneda = value * venta;
      } else if (type == "VENTA-USD") {
        moneda = value;
        value = moneda * compra;
      }

      Account.findOne({ where: { cvu: origin } })
        .then((response) => {
          if (response.dataValues.balance >= moneda) {
            var cantidad = response.dataValues.balance - moneda;
            Account.update({ balance: cantidad }, { where: { cvu: origin } })
              .then((responseA) => {
                return Account.findOne({ where: { cvu: destination } });
              })
              .then((responseB) => {
                var cantidadRecive =
                  responseB.dataValues.balance - 1 + value + 1;
                return Account.update(
                  { balance: cantidadRecive },
                  { where: { cvu: destination } }
                );
              })
              .then((responseC) => {
                Transfer.create({
                  origin,
                  destination,
                  value,
                  type,
                  currency,
                  description: "COMPRA: " + compra + " - VENTA: " + venta,
                });
              })
              .then((responseD) => {
                res.send("cambio de moneda realizado con exito");
              })
              .catch((err) => {
                return err;
              });
          } else {
            res.send(
              "la cuenta de origen no cuenta con saldo suficiente para realizar esta transferencia"
            );
          }
        })
        .catch((err) => {
          console.log("HUBO ERROR EN LA TRANSACCION", err);
          res.send(err);
        });

      // res.send({compra, venta, moneda})
    });
});

server.post("/deposito", (req, res) => {
  const { cvu, value, currency } = req.body;
  Account.findOne({ where: { cvu } })
    .then((response) => {
      var total = response.dataValues.balance - 1 + value + 1;
      Account.update({ balance: total }, { where: { cvu } });
    })
    .then((responseA) => {
      Transfer.create({
        origin: 0,
        destination: cvu,
        value,
        type: "DEP",
        currency,
        description: "Deposito de usuario.",
      });
      res.send("Deposito realizado correctamente");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

server.post("/retiro", (req, res) => {
  const { cvu, value, currency } = req.body;
  Account.findOne({ where: { cvu } })
    .then((response) => {
      var total = response.dataValues.balance - value;
      Account.update({ balance: total }, { where: { cvu } });
    })
    .then((responseA) => {
      Transfer.create({
        origin: cvu,
        destination: 0,
        value,
        type: "EXT",
        currency,
        description: "Retiro de usuario.",
      });
      res.send("Retiro realizado correctamente");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = server;
