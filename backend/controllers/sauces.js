//implementer la logique metier des routes
const Sauce = require("../models/sauce");
const fs = require("fs"); //acces aux opérations liées au système de fichiers
const { update } = require("../models/sauce");
const { param } = require("../routes/sauces");

exports.findSauces = (req, res) => {
  //trouver toutes les données de la database
  Sauce.find()
    .then((dbresponse) => {
      res.status(200).json(dbresponse);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.findSaucebyId = (req, res) => {
  //trouver en particulier une donnée avec :id = paramètre dynamique
  Sauce.findById(req.params.id)
    .then((dbresponse) => {
      res.status(200).json(dbresponse);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.createSauces = (req, res) => {
  //recuperation de la chaîne de caractères que l'on parse en objet
  console.log(req.body);
  const sauceObject = JSON.parse(req.body.sauce);
  Sauce.create({
    userId: sauceObject.userId,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    heat: sauceObject.heat,
    likes: 0,
    dislikes: 0,
  })
    .then(() => {
      res.status(201).json({ message: "sauce enregistrée" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.modifySauces = (req, res) => {
  //si on trouve un fichier,on traite la nouvelle image
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      } //sinon on prend le corps de la requête,on traite simplement l'objet entrant
    : { ...req.body };
  //creation d'une instance Sauce à partir de sauceObject
  //mettre à jour une donnée grâce à son id, modifier celle-ci avec les nouvelles infos dans le corps de requête
  Sauce.findByIdAndUpdate(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée!" }))
    .catch((error) => {
      res.status(400).json({ error });
    });
};
exports.modifyLikes = (req, res) => {
  const userId = req.body.userId;
  const sauceId = req.params.id;
  const userlike = req.body.like;
  console.log(userId, sauceId, userlike);

  Sauce.findOne({ _id: sauceId })
    .then((result) => {
      console.log(result);
      const modifiedValues = {
        usersLiked: result.usersLiked,
        usersDisliked: result.usersDisliked,
        likes: 0,
        dislikes: 0,
      };
      switch (userlike) {
        case 1: // CAS: sauce likée
          modifiedValues.usersLiked.push(userId);
          break;
        case -1: // CAS: sauce dislikée
          modifiedValues.usersDisliked.push(userId);
          break;
        case 0: // CAS: Annulation du like/dislike
          if (modifiedValues.usersLiked.includes(userId)) {
            // si on annule le like
            const index = modifiedValues.usersLiked.indexOf(userId);
            modifiedValues.usersLiked.splice(index, 1);
          } else {
            // si on annule le dislike
            const index = modifiedValues.usersDisliked.indexOf(userId);
            modifiedValues.usersDisliked.splice(index, 1);
          }
          break;
      }
      // Calcul du nombre de likes / dislikes
      modifiedValues.likes = modifiedValues.usersLiked.length;
      modifiedValues.dislikes = modifiedValues.usersDisliked.length;
      // Mise à jour de la sauce avec les nouvelles valeurs
      Sauce.updateOne({ _id: sauceId }, modifiedValues)
        .then(() => res.status(200).json({ message: "Sauce notée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteSauces = (req, res) => {
  //trouver l'objet dans la db
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //extraire le nom du fichier à supprimer avec split
      //recuperer la 2nd partie du tableau(après images = nom du fichier)
      const filename = sauce.imageUrl.split("/images/")[1];
      //suppression de l'image
      fs.unlink(`images/${filename}`, () => {
        //supprimer de l'objet dans la db
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
