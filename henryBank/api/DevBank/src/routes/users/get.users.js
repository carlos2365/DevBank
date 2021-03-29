const server = require("express").Router();
const userController = require("../../controllers/users.controller");

const { Account } = require("../../database/db");

server.get("/account/:id/:currency", (req, res) => {
  var id = req.params.id;
  var currency = req.params.currency;
  Account.findOne({ where: { userId: id, currency } })
    .then((response) => {
      res.json(response.dataValues);
    })
    .catch((err) => {
      console.log(err);
      //res.send(err);
    });
});

server.get("/", (req, res) => {
  userController.getUsers().then((users) => {
    res.status(200).json(users);
  });
});

server.get("/:userId", (req, res) => {
  const { userId } = req.params;

    userController.getOneUser(userId)
        .then((user) => {
            res.status(200).json(user)
        })
})


module.exports = server;
