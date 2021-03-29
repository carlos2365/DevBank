const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
var session = require('express-session');

const server = express();

server.use(
  session({
    secret: "secret",
    // resave en true = en cada peticion, aunque la sesion no haya sido modificada la vamos a guardar.
    resave: true,
    // saveUnitialized en true = si inicializamos sesion en una peticion y no le guardamos nada, aun asi se guarda.
    saveUninitialized: true,
  })
);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});



const { Users } = require("./database/db");
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));




server.use((req, res, next) => {
  console.log(req.session);
  console.log(req.session.user);
  next();
});

server.use("/", routes);
module.exports = server;
