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
import { category } from '../models/category'; // Ajustez le chemin vers votre modèle category
import { post } from '../models/post'; // Ajustez le chemin vers votre modèle post
import { comment } from '../models/comment'; // Ajustez le chemin vers votre modèle comment
import { tag } from '../models/tag'; // Ajustez le chemin vers votre modèle tag
import { postTag } from '../models/postTag'; // Ajustez le chemin vers votre modèle postTag
import { token } from '../models/token'; // Ajustez le chemin vers votre modèle postTag


export const connection = new Sequelize({
  dialect: 'mysql', 

  host: process.env.DB_HOST!,      // Votre serveur est sur votre machine
  username: process.env.DB_USER!,       // Votre utilisateur MySQL (souvent 'root')
  password: process.env.DB_PASSWORD!, // Le mot de passe défini à l'installation de MySQL Server
  database: process.env.DB_NAME!,      // Le nom du schéma créé à l'étape 2
  port: Number(process.env.DB_PORT) || 3306,   // Le port par défaut de MySQL

  models: [user, category, post, comment, tag, postTag, token], // Vos modèles Sequelize-TypeScript models: [user], 
  logging: console.log,   // Permet de voir les requêtes SQL dans le terminal
});
