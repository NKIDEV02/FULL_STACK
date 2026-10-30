import { category } from "../models/category";


export async function getAllCategories(){
     const categories = await category.findAll(); // select * from categories 
     
     return categories;
}