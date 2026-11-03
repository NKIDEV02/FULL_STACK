import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { user } from "./user";


@Table
export class token extends Model<token>{

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    token?: string;

    
    @Column({
        type:DataType.ENUM("activation", "reset"),
        allowNull: false
    })
    type?: "activation" | "reset";



    @ForeignKey(()=>user)
    @Column({
        type:DataType.INTEGER,
        allowNull: false
    })
    userId?: number

    @BelongsTo(()=>user)
    user?: user;


}