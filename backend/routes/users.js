//creation de la route user
const express = require("express");

const router = express.Router();

const password = require("../middlewares/password");

const usersCtrl = require("../controllers/users");
router.post("/signup", password, usersCtrl.signup);

router.post("/login", usersCtrl.login);

module.exports = router;
