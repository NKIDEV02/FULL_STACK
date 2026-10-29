import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { user } from "./user";


@Table
export class token extends Model<token>{

    @Column({
        type:DataType.STRING
    })
    token?: string;

    @ForeignKey(()=>user)
    @Column({
        type:DataType.INTEGER
    })
    userId?: number

    @BelongsTo(()=>user)
    user?: user;

    @Column({
        type:DataType.ENUM("activation", "reset")
    })
    type?: "activation" | "reset";


}