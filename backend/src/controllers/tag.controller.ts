import { Request, Response} from "express";
import { addTag, deleteTag, getAllTags, getTagById, getTagBySlug } from "../services/tag.service";
import z from "zod";
import { generateSlug } from "../shared/general.util";

// Create a tag controller to handle the request and response for the tag routes
export const getTagsController = async (req: Request, res: Response) =>{

    const tags = await getAllTags();

    return res.json(tags);
}


export const addTagController = async ( req: Request, res: Response)=>{

     // Validate the request body using zod
        const schema = z.object({
            name: z.string()
        });
    
        const schemaValidation = schema.safeParse(req.body);
        if(!schemaValidation.success){
            return res.status(400).json({message: 'Invalid data', errors: schemaValidation.error})
        }

    const { name} = req.body;

    let slug = generateSlug(name);

    const tagAlreadyExysts = await getTagBySlug(slug); 

    if(tagAlreadyExysts){
        slug = generateSlug(name, true);
    }

    const newTag = await addTag(name, slug, 1);

    return res.json(newTag);
}

export const updateTagController = async (req: Request, res: Response)=>{
     
    // Validate the request body using zod
        const schema = z.object({
            name: z.string(),
            id: z.number()
        });
    
        const schemaValidation = schema.safeParse(req.body);
        if(!schemaValidation.success){
            return res.status(400).json({message: 'Invalid data', errors: schemaValidation.error})
        }

        const {name, id} = req.body;

        const tag = await getTagById(id);

        if(!tag){
            return res.status(404).json({message: 'Tag not found'});
        }

         if(tag.name === name){
            return res.status(404).json({message: 'Nothing was changed.'});
        }

        let slug = generateSlug(name);

        const tagAlreadyExysts = await getTagBySlug(slug);

        if(tagAlreadyExysts){
            slug = generateSlug(name, true);
        }

        tag.name = name;
        tag.slug = slug;
        await tag.save();

        return res.json(tag);
    
    }

    export const deleteTagController = async (req: Request, res: Response)=>{
        // Validate the request body using zod
        const schema = z.object({
            id: z.number()
        });
    
        const schemaValidation = schema.safeParse(req.body);

        if(!schemaValidation.success){
            return res.status(400).json({message: 'Invalid data', errors: schemaValidation.error})
        }

        const {id} = req.body;

        const tag = await getTagById(id);

        if(!tag){
            return res.status(404).json({message: 'Tag not found'});
        }

        await deleteTag(id);

        //return res.json({message: 'Tag deleted successfully'});
        
        return res.json({tag});
    }