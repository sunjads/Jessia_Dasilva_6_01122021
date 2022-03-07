const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
//pour appliquer le middleware aux routes
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

//création des routes (CRUD)
router.get("/", saucesCtrl.findSauces);
router.get("/:id", saucesCtrl.findSaucebyId);
router.post("/", auth, multer, saucesCtrl.createSauces);
router.post("/:id/like", auth, multer, saucesCtrl.modifyLikes);
//requete put sur postman>send>MAJ mongodb
router.put("/:id", auth, multer, saucesCtrl.modifySauces);
router.delete("/:id", auth, saucesCtrl.deleteSauces);

module.exports = router;
