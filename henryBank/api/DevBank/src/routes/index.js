const express = require("express");
const router = express.Router();

//routes Users
const postUsers = require("./users/post.users");
const getUsers = require("./users/get.users");
const putUsers = require("./users/put.users");
const postAuth = require("./auth/post.auth");
const transfer = require("./transfer/tranfer");
const getTransfer = require("./transfer/get.transfer");
const contact = require("./contact/contact");
// const account = require("./account/account")
const statistics = require("./statistics");

// statistics
router.use("/users/statistics", statistics);

// tranfer
router.use("/users/transfer", transfer);
router.use("/users/transfer", getTransfer);

// auth login
router.use("/users/auth", postAuth);

//Contact route
router.use("/users/contact", contact);

// Account rute
// router.use('/account', account);
// use Users
router.use("/users", postUsers);
router.use("/users", getUsers);
router.use("/users", putUsers);

module.exports = router;
