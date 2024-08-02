const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Charger les variables d'environnement
dotenv.config();

// Récupérer l'URL de connexion depuis les variables d'environnement
const URL = process.env.URL;

// Fonction pour établir la connexion à MongoDB
const dbConnection = () => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB est connecté");
    })
    .catch((err) => {
      console.error("Erreur de connexion MongoDB:", err);
    });
};

module.exports = dbConnection;
