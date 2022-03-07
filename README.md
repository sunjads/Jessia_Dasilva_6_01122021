# Technologies

• Node.js • Express • MongoBD • Mongoose

# le front-end

Créer un dossier
A l'interieur de ce dossier, cloner le repository de https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6
Renommer le dossier Web-Developer-P6 en frontend
Suivre les étapes avec le fichier README.md

# le back-end

Dans le dossier créé,
Cloner le repository à partir de https://github.com/sunjads/Jessia_Dasilva_6_01122021/tree/main/backend
Aller dans le dossier backend avec le terminal et installer
les dépendances nécessaires
'cd backend'
'npm install'
'npm install --save -dev nodemon'

# Mettre en place le fichier .env à la racine

Dans ce fichier, insérer les informations :

#lien vers la base de données mongoDB personnel
MONGODB_PATH = mongodb+srv://USER:PSW@HOST/ <dbname >?retryWrites=true & w=majority

#pour remplacer la string "TOKEN_SECRET" par des chiffres
ACCESS_TOKEN_SECRET = xxxx

#pour la clé de chiffrement du mail
CRYPTOJS_KEY = xxxx

# Lancement du server

Lancer le server backend avec 'npm start'
