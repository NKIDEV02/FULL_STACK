import { Request, Response} from "express";
import { addComment, deleteComment, getCommentById, getPostComments, updateComment } from "../services/comment.service";
import z from "zod";
import { getPostById } from "../services/post.service";

// Create a comment controller to handle the request and response for the comment routes
export const getPostCommentsController = async (req: Request, res: Response) =>{
 // Validate the request body using zod
        const schema = z.object({
            postId: z.number()
        });
    
        const safeData = schema.safeParse({
            postId: parseInt(req.params.postId as string)
        });

        if(!safeData.success){
            return res.status(400).json({message: 'Invalid data', errors: safeData.error})
        }

    const { postId } = safeData.data;
    
    const post = await getPostById(postId);
    if(!post){
        return res.status(404).json({message: 'Invalid post id'});
    }

    const comments = await getPostComments(postId);

    return res.json(comments);


}


export const addCommentController = async ( req: Request, res: Response)=>{
    
     // Validate the request body using zod
        const schema = z.object({
            postId: z.number(),
            content: z.string()
        });
    
        const safeData = schema.safeParse(req.body);
        if(!safeData.success){
            return res.status(400).json({message: 'Invalid data', errors: safeData.error})
        }

    const { postId, content } = safeData.data;
    const userId = 1; // hardcoded user id  

    const post = await getPostById(postId);
    
    if(!post){
        return res.status(400).json({message: 'Invalid post id'});
    }

    const comment = await addComment(postId, content, userId);

    return res.json(comment);

}


export const updateCommentController = async (req: Request, res: Response)=>{
     
    const userId = 1; // hardcoded user id for now, will be replaced with the logged in user id later

   // Validate the request body using zod
         const schema = z.object({
            commentId: z.number(),
            content: z.string()
        });
    
        const safeData = schema.safeParse(req.body);
        if(!safeData.success){
            return res.status(400).json({message: 'Invalid data', errors: safeData.error})
        }

        const { commentId, content } = safeData.data;

        // checking if comment id is valid
        const comment = await getCommentById(commentId);

         if(!comment){
            return res.status(400).json({message: 'Comment not found'});
        }


        // check if user is the owner of the comment
          if(comment.userId !== userId){
            return res.status(400).json({message: 'You are not authorized to update this comment'});
        }
     
 
        // update the comment
        const updatedComment = await updateComment(commentId, content);

        return res.json(updatedComment);

    }



export const deleteCommentController = async (req: Request, res: Response)=>{
        
    const userId = 1; // hardcoded user id for now, will be replaced with the logged in user id later

   // Validate the request body using zod
        const schema = z.object({
            commentId: z.number(),
        });
    
        const safeData = schema.safeParse(req.body);
        if(!safeData.success){
            return res.status(400).json({message: 'Invalid data', errors: safeData.error})
        }

        const { commentId } = safeData.data;

        // checking if comment id is valid
        const comment = await getCommentById(commentId);

        if(!comment){
            return res.status(400).json({message: 'Invalid Comment id'});
                }

        // check if current user is the owner of this comment
        if(comment.userId !== userId){
            return res.status(400).json({message: 'You are not authorized to delete this comment'});
                }
                
        // delete the comment
        await deleteComment(commentId);

        //return res.json({message: 'Comment deleted successfully'});
            
        return res.json({comment});

    }