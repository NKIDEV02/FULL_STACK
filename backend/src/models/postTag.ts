import { Column, ForeignKey, Table, Model, DataType } from "sequelize-typescript";
import { post } from "./post";
import { tag } from "./tag";


@Table
export class postTag extends Model<postTag>{

    @ForeignKey(()=>post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare postId?: number;

    
    @ForeignKey(()=>tag)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare tagId?: number;
}