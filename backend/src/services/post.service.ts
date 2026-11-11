
import { post } from "../models/post";


export const getAllPosts = ()=>{
     //const posts = await post.findAll(); // select * from post 
     
     return post.findAll({
          include: ['category', 'user', 'tags']
     }); 
}


export const getPostBySlug = (slug: string)=>{
     return post.findOne({
          where:{
               slug
          }
     }
     )
}


export const addPost = (title: string, content: string, categoryId: number, userId: number, slug: string)=>{
     const Post = new post();
     Post.title = title;
     Post.content = content;
     Post.categoryId = categoryId;
     Post.userId = userId;
     Post.slug = slug;

     return Post.save();

}

export const getPostById = (id: number)=>{
     return post.findByPk(id);
}

export const updatePost = async(id: number, title: string, content: string, 
     categoryId: number, slug?: string)=>{
     const post = await getPostById(id);
     if(!post)
          throw new Error('Post not found');
     
     if(title)
           post.title = title;

     if(content)
          post.content = content;

     if(categoryId)
          post.categoryId = categoryId;

     if(slug)
          post.slug = slug;


     return post.save();
}


export const deletePost = (id: number)=>{
     return post.destroy({
          where:{
               id
          }
     })
}