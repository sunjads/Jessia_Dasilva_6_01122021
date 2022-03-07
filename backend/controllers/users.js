//TODO requete post pour hacher mdp + ajout du user à db
const User = require("../models/user");
//pour hacher le mdp
const bcrypt = require("bcrypt");
//pour créer un token
const jwt = require("jsonwebtoken");
// pour chiffre l'email
const cryptojs = require("crypto-js");
require("dotenv").config();

//à partir de l'inscription sur l'app

exports.signup = (req, res) => {
  //fonction asynchrone qui recoit un mdp haché/crypté + cb de fois on "sale " = execute l'alg de hachage
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        //chiffrer l'email avant de l'envoyer dans la db
        email: cryptojs
          .HmacSHA256(req.body.email, process.env.CRYPTOJS_KEY)
          .toString(),
        //hacher le mdp, et enregistrer le hash de bcrypt dans la db
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//permettre la connexion aux users existants
exports.login = (req, res) => {
  const cryptedEmail = cryptojs
    .HmacSHA256(req.body.email, process.env.CRYPTOJS_KEY)
    .toString();
  //trouver le user correspond a l'email entré
  User.findOne({ email: cryptedEmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "utilisateur non trouvé" });
      }
      bcrypt //compare le mdp entré par le user avec le hash enregistré dans la db
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "mot de passe incorrect" });
          } //sinon renvoyer rep contenant l'ID utilisateur et un token
          res.status(200).json({
            userId: user._id, //encodage d'un token avec sign avec l'id à l'interieur
            token: jwt.sign(
              { userId: user._id },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
