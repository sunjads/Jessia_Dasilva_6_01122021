const mongoose = require("mongoose");
//ameliorer les messages d'erreur
const uniqueValidator = require("mongoose-unique-validator");

//creation du schéma user

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//passer le plugin validator pour empecher plusieurs users / même mail
userSchema.plugin(uniqueValidator);

//création du modèle/collection user
const User = mongoose.model("User", userSchema);

module.exports = User;
