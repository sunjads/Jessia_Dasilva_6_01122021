const multer = require("multer");

//elements du dictionnaire type MIME pour résoudre l'extension de fichier appropriée
const MIME_TYPES = {
  "images/jpg": "jpg",
  "images/jpeg": "jpg",
  "images/png": "png",
};

//logique pour indiquer à multer où enregistrer les fichiers entrants
//fct diskStorage avec 2 paramètres: la destination & le nom de fichier
const storage = multer.diskStorage({
  //3 paramètres
  destination: (req, file, callback) => {
    //arg : (pas d'erreurs ) = null + nom du dossier = destination
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    //accés à la propriété originalname de file pour utiliser le nom d'origine
    const name = file.originalname.split(" ").join("_");
    //création de l'extension du fichier
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

//passer constant storage + methode single pour signifier que c'est un fichier d'images unique
module.exports = multer({ storage: storage }).single("image");
