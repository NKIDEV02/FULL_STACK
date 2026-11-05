import { Table, Model, Column, ForeignKey, DataType, BelongsTo } from "sequelize-typescript";
import { user } from "./user";
import { post } from "./post";


@Table
export class comment extends Model<comment>{

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    declare content : string;
    
    @ForeignKey(()=>user)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId?: number;

    @ForeignKey(()=>post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare postId?: number;

    @BelongsTo(()=>post)
    declare post?: post; 

    @BelongsTo(()=>user)
    declare user?: user;
}