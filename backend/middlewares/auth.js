const jwt = require("jsonwebtoken");
require("dotenv").config();

//sur les routes protégées , on va d'abord passer par ce middleware
module.exports = (req, res, next) => {
  try {
    //recuperer le token dans le header authorisation ( bearer)
    const token = req.headers.authorization.split(" ")[1];
    //decoder un token qui va donner un objet js
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //recuperer le userId qui est dedans
    const userId = decodedToken.userId;
    //comparer le userId dans la demande et celui extrait du token
    if (req.body.userId && req.body.userId !== userId) {
      throw "id utilisateur invalide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("requête invalide"),
    });
  }
};
