import { error } from "node:console";
import { category } from "../models/category";


export async function getAllCategories(){
     const categories = await category.findAll(); // select * from categories 
     
     return categories;
}

export async function addCategory(name: string, slug: string, userId: number){
     const Category = new category();
     Category.name = name;
     Category.userId = userId;
     Category.slug = slug;

     await Category.save();

     return Category;
}


export async function getCategoryBySlug(slug: string){
     const Category = await category.findOne({
          where: {
               slug
          }
     })

     return Category;
}

export async function updateCategory(name: string, slug: string, id: number) {
     const Category = await category.findByPk(id)

     if(!Category){
          throw new Error('Category not found');
     }
     
     if(name) Category.name = name;
     if(slug) Category.name = slug;
     await Category.save();

     return Category
}

export async function getCategoryById(id: number) {
     const Category = await category.findByPk(id)
     return Category;
     
}


export async function deleteCategory(id: number) {
     const Category = await category.findByPk(id);

     if(!Category){
          throw new Error('Category not found');
     }

     await Category.destroy();
     return Category;
}