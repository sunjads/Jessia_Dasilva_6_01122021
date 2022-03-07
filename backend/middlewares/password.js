const passwordValidator = require("password-validator");

// creer un "schema" pour le mdp utilisateur
var passwordschema = new passwordValidator();

// propriétés
passwordschema
  .is()
  .min(8) // min 8 caractères
  .is()
  .max(100) // max 8 caractères
  .has()
  .uppercase() // doit contenir des majuscules
  .has()
  .lowercase() // doit contenir des miniscules
  .has()
  .digits(2) // doit contenir min 2 nombres
  .has()
  .not()
  .spaces() // ne devrait pas contenir d'espaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // valeurs blacklistées

//verification du mdp entré vs les propriétés
module.exports = (req, res, next) => {
  if (passwordschema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error:
        "le mot de passe entré n'est pas assez fort: " +
        passwordschema.validate("req.body.password", { list: true }),
    });
  }
};
