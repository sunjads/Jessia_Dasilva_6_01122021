const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const saucesroute = require("./routes/sauces");
const usersroute = require("./routes/users");

const app = express();

//connexion à mongodb par mongoose
//Mongoose est un package qui facilite les interactions avec MongoDB grâce à des fonctions extrêmement utiles.
mongoose
  .connect(process.env.MONGODB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`Connexion à MongoDB réussie : ${process.env.MONGODB_PATH}`)
  )

  .catch(() => console.log("Connexion à MongoDB échouée !"));

//middlewares executés par le serveur
//midd generale = appliqué à toutes les routes
// ajouter objets header aux reponses (Cross Origin Resource Sharing) et permet à l'app d'acceder à l'api
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//transformer le corps/ la data d'une requete post/patch/put et l'expose dans le req.body( = le rend en objet js utilisable)
app.use(express.json());
//le chemin statique a été crée pour fournir les images
app.use("/images", express.static(path.join(__dirname, "images")));

//enregistre toutes les requêtes passées au serveur(sécurité)
app.use(morgan("dev"));
// sécurise les headers
app.use(helmet());

//reste de l'adresse des routes
app.use("/api/sauces", saucesroute);
app.use("/api/auth", usersroute);

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

module.exports = app;
