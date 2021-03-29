const server = require("express").Router();
const userController = require("../../controllers/users.controller");

server.put("/:userId", (req, res) => {
  const info = req.body;
  const { userId } = req.params;

  userController
    .getOneUser(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      }
      return userController.updateInfo(user, info);
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = server;
