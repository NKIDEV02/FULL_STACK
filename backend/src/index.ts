import express from 'express';
import { sequelize } from './database/connection';


// Affichage de l'interface Admin
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Backend: Node js, Express js ');
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
});




// Synchronisation du Backend au BD
async function startServer() {
  try {
    // Établit la connexion et synchronise les modèles avec la base de données
    await sequelize.authenticate();
    console.log(' Confection à MySQL réussie !');
    
    // force: false évite de supprimer vos données à chaque redémarrage
    await sequelize.sync({ force: false }); 
    console.log(' Les tables ont été synchronisées avec succès.');
    
    // Votre code pour démarrer Express ou votre serveur ici...
    
  } catch (error) {
    console.error(' Impossible de se connecter à la base de données :', error);
  }
}

startServer();
