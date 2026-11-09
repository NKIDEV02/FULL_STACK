
import { tag } from "../models/tag";


export const getAllTags = ()=>{
     //const tags = await tag.findAll(); // select * from tags 
     
     return tag.findAll(); 
}


export const addTag = (name: string, slug: string, userId: number)=>{
     const Tag = new tag();
     Tag.name = name;
     Tag.userId = userId;
     Tag.slug = slug;

     Tag.save();

     return Tag;
}


export const getTagBySlug = (slug: string)=>{
     return tag.findOne({
          where:{
               slug
          }
     }
     )
}


export const getTagById = (id: number)=>{
     return tag.findByPk(id);
}


export const deleteTag = (id: number)=>{
     return tag.destroy({
          where:{
               id
          }
     })
}