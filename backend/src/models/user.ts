import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import { post } from "./post";
import { comment } from "./comment";
import { token } from "./token";

@Table
export class user extends Model<user> {

    @Column(DataType.STRING) 
    name: string = ''

    @Column({
       type:DataType.STRING,
        unique:true,
        allowNull: false
    }) 
    email: string = ''

    @Column({
        type:DataType.STRING,
        allowNull: false

     }) 
    password: string = ''


    //un user peut avoir plusieurs posts (user 1-n post)
    @HasMany(()=>post)
    posts: post[] = []

    //un user peut avoir plusieurs comment (user 1-n comment)
    @HasMany(()=>comment)
    comments: comment[] = []


    //un user peut avoir plusieurs token (user 1-n token)
    @HasMany(()=>token)
    tokens: token[] = []



}