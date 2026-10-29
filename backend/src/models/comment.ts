import { Table, Model, Column, ForeignKey, DataType, BelongsTo } from "sequelize-typescript";
import { user } from "./user";
import { post } from "./post";


@Table
export class comment extends Model<comment>{

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    content : string = ""
    
    @ForeignKey(()=>user)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId?: number

    @ForeignKey(()=>post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    postId?: number

    @BelongsTo(()=>post)
    post?: post; 

    @BelongsTo(()=>user)
    user?: user;
}