import dotenv from 'dotenv';

dotenv.config({ 
  path:'./src/.env'
 });


import path from 'path';
import { Sequelize } from 'sequelize-typescript'; 

console.log("Vérification USER de la DB :", process.env.DB_USER); // Doit afficher votre utilisateur (ex: root)
console.log("Vérification NAME de la DB :", process.env.DB_NAME); 


export const connection = new Sequelize({
  dialect: 'mysql', 

  host: process.env.DB_HOST!,      // Votre serveur est sur votre machine
  username: process.env.DB_USER!,       // Votre utilisateur MySQL (souvent 'root')
  password: process.env.DB_PASSWORD!, // Le mot de passe défini à l'installation de MySQL Server
  database: process.env.DB_NAME!,      // Le nom du schéma créé à l'étape 2
  
  port: Number(process.env.DB_PORT) || 3306,   // Le port par défaut de MySQL



// ICI : On pointe directement sur le dossier contenant tous les modèles
// Accepte à la fois les fichiers .ts (en dev) et .js (en prod)
 models: [path.join(__dirname, '..', 'models', '*.{ts,js}')],



  logging: console.log,   // Permet de voir les requêtes SQL dans le terminal
});
