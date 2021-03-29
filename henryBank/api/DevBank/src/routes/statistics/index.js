const server = require("express").Router();
const statisticsController = require("../../controllers/statistics.controller");
const moment = require("moment");

server.get("/:cvu/:type", (req, res) => {
  const { cvu, type } = req.params;
  var number = 0;
  if (type == "months") {
    number = 6;
  } else if (type == "weeks") {
    number = 12;
  } else if (type == "days") {
    number = 31;
  }

  statisticsController
    .getMonth(cvu, number, type)
    .then((result) => {
      if (result) {
        var egresos = {};
        var ingresos = {};
        for (let i = 1; i <= number; i++) {
          egresos[i] = 0;
          ingresos[i] = 0;
          var dia = moment().subtract(i, type).toDate();
          var dia1 = moment()
            .subtract(i - 1, type)
            .toDate();
          result.map((pos) => {
            if (
              pos.origin == cvu &&
              pos.createdAt >= dia &&
              pos.createdAt < dia1
            ) {
              egresos[i] = egresos[i] + parseInt(pos.value);
            }
            if (
              pos.destination == cvu &&
              pos.createdAt >= dia &&
              pos.createdAt < dia1
            ) {
              ingresos[i] = ingresos[i] + parseInt(pos.value);
            }
          });
        }
        res.status(200).json({ egresos, ingresos });
      } else {
        res.status(400).send({ msg: "No data founded" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = server;
