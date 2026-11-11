import { postTag } from "../models/postTag";


export const addPostTags = async (postId: number, tagIds: number[])=>{
   const data: any = tagIds.map((tagId) => ({
            postId,
            tagId
    }))
   
    return await postTag.bulkCreate(data);
}