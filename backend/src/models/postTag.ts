import { Column, ForeignKey, Table, Model, DataType } from "sequelize-typescript";
import { post } from "./post";
import { tag } from "./tag";


@Table
export class postTag extends Model<postTag>{

    @ForeignKey(()=>post)
    @Column({
        type: DataType.INTEGER
    })
    postId?: number

    
    @ForeignKey(()=>tag)
    @Column({
        type: DataType.INTEGER
    })
    tagId?: number
}