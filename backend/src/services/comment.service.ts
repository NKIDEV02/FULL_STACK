import { comment } from "../models/comment";


export const getPostComments = async (postId: number)=>{
     
     return comment.findAll({ 
        where: {
             postId // where postId = postId
            } 
        }); 
}
 

export const addComment = (postId: number, content: string, userId: number)=>{
     const Comment = new comment();

     Comment.postId = postId;
     Comment.content = content;
     Comment.userId = userId;

     return Comment.save();

}


export const getCommentById = async(commentId: number)=>{

     return comment.findByPk(commentId);
}


export const updateComment = async(commentId: number, content: string)=>{
     const comment = await getCommentById(commentId);
     if(!comment)
          throw new Error('Comment not found');

     comment.content = content;

     return comment.save();
}



export const deleteComment = async (commentId: number)=>{
     const comment = await getCommentById(commentId);
     if(!comment)
          throw new Error('Comment not found');

     return comment.destroy();
}