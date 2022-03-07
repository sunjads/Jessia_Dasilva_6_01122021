const mongoose = require("mongoose");

//création d'une base de données sauce

//creation du schéma sauce avec la fct schema de mongoose
const Schema = mongoose.Schema;
const sauceSchema = new Schema({
  //le type et différents config
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
});
//création du modèle/collection sauce
const Sauce = mongoose.model("Sauce", sauceSchema);

module.exports = Sauce;
