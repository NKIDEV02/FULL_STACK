import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { connection } from './database/connection';
import categoryRoutes from './routes/category.routes';


// Affichage de l'interface Admin
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/api/categories', categoryRoutes);




app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
});









// Synchronisation du Backend au BD
async function startServer() {
  try {
    // Établit la connexion et synchronise les modèles avec la base de données
    await connection.authenticate();
    console.log(' Confection à MySQL réussie !');

    //pour la production
    

    // force: false évite de supprimer vos données à chaque redémarrage
    // force: false n'applique pas les changements de colonnes
    //await connection.sync({ force: false }); 
    //console.log(' Les tables ont été synchronisées avec succès.');


   // alter: true pour le développement et Migration pour la production

   // alter: true va modifier les tables existantes pour ajouter les nouvelles colonnes
   //await connection.sync({ alter: true });
   //console.log(' Les tables ont été synchronisées et mises à jour avec succès.');



// force: true va supprimer l'ancienne table cassée et recréer la nouvelle proprement
await connection.sync({ force: true });
console.log(' Les tables ont été recréées proprement !');



    
    // Votre code pour démarrer Express ou votre serveur ici...
    
  } catch (error) {
    console.error(' Impossible de se connecter à la base de données :', error);
  }
}

startServer();
