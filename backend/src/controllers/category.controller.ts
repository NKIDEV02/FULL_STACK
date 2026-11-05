import { Request, Response } from "express";
import { category } from "../models/category";
import { addCategory, deleteCategory, getAllCategories, getCategoryById, getCategoryBySlug, updateCategory } from "../services/category.service";
import { generateSlug } from "../shared/general.util";
import z from "zod";


// Create a category controller to handle the request and response for the category routes
export const getCategories = async (req: Request, res: Response) =>{

    const categories = await getAllCategories();

    res.json(categories);
}


// Add a category controller to handle the request and response for the category routes
export const addCategoryController = async (req: Request, res: Response) =>{
    
    // Validate the request body using zod
    const schema = z.object({
        name: z.string()
    });

    const schemaValidation = schema.safeParse(req.body);
    if(!schemaValidation.success){
        return res.status(400).json({message: 'Invalid data', errors: schemaValidation.error})
    }


    const {name} = req.body;
    const userId = 1;
    let slug = generateSlug(name);

    const categoryBySlug = await getCategoryBySlug(slug);

    if(categoryBySlug){
        slug = generateSlug(name, true)
    }

    const Category = await addCategory(name, slug, userId);

    res.json(Category)
}



// Update a category controller to handle the request and response for the category routes
export const updateCategoryController = async (req: Request, res: Response) =>{


     // Validate the request body using zod
    const schema = z.object({
        name: z.string(),
        id: z.number()
    });

    const schemaValidation = schema.safeParse(req.body);
    if(!schemaValidation.success){
        return res.status(400).json({message: 'Invalid data', errors: schemaValidation.error})
    }
    
    
    let {name, id} = req.body;

    let slug = generateSlug(name);

    const categoryBySlug = await getCategoryBySlug(slug);

    if(categoryBySlug){
        res.status(400).json({message: 'Category already exists'})
    }

    // check if category exist by the given id 
    let dbCategory = await getCategoryById(id);

    if(!dbCategory){
        res.status(404).json({message: 'Category not found'})
    }

    // update the category
    let updatedCategory = await updateCategory(name, slug, id);

    res.json(updatedCategory);

}



// Delete a category controller to handle the request and response for the category routes
export const deleteCategoryController = async (req: Request, res: Response)=>{
    

     // Validate the request body using zod
    const schema = z.object({
        id: z.number()
    });

    const schemaValidation = schema.safeParse(req.body);
    if(!schemaValidation.success){
        return res.status(400).json({message: 'Invalid data', errors: schemaValidation.error})
    }
    
    
    const {id} = req.body;

    const Category = await getCategoryById(id);
    if(!Category){
        res.status(404).json({message: 'Category not found'})
    }

    await deleteCategory(id)


    res.json(Category)
}