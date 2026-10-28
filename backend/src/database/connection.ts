/*import { Sequelize } from "sequelize-typescript";

export const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'blog',
    models: [__dirname + '/../models']
    
}); */

import { Sequelize } from 'sequelize-typescript';
import { user } from '../models/user'; // Ajustez le chemin vers votre modèle User

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',      // Votre serveur est sur votre machine
  port: 3306,             // Le port par défaut de MySQL
  username: 'root',       // Votre utilisateur MySQL (souvent 'root')
  password: 'Mysql@2026', // Le mot de passe défini à l'installation de MySQL Server
  database: 'blog',     // Le nom du schéma créé à l'étape 2
  models: [user],         // Vos modèles Sequelize-TypeScript
  logging: console.log,   // Permet de voir les requêtes SQL dans le terminal
});
