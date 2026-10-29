import { Column, DataType, Table, Model, BelongsToMany} from "sequelize-typescript";
import { post } from "./post";
import { postTag } from "./postTag";


@Table
export class tag extends Model<tag>{

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    name?: string;


    @BelongsToMany(()=>post, ()=>postTag)
    posts: post[] = []

}