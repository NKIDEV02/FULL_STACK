import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import { post } from "./post";
import { comment } from "./comment";
import { token } from "./token";
import { category } from "./category";
import { tag } from "./tag";

@Table
export class user extends Model<user> {

    @Column(DataType.STRING) 
    declare name: string;

    @Column({
       type:DataType.STRING,
        unique:true,
        allowNull: false
    }) 
    declare email: string;

    @Column({
        type:DataType.STRING,
        allowNull: false

     }) 
    declare password: string;


    //un user peut avoir plusieurs posts (user 1-n post)
    @HasMany(()=>post)
    posts: post[] = []

    //un user peut avoir plusieurs comment (user 1-n comment)
    @HasMany(()=>comment)
    comments: comment[] = []


    //un user peut avoir plusieurs token (user 1-n token)
    @HasMany(()=>token)
    tokens: token[] = []

   //un user peut avoir plusieurs category (user 1-n category)
    @HasMany(()=>category)
    categories: category[] = []


   //un user peut avoir plusieurs tag (user 1-n tag)
    @HasMany(()=>tag)
    tags: tag[] = []

}