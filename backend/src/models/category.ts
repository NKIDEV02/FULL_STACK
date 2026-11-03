import { Column,ForeignKey, DataType, Model, Table, BelongsTo } from "sequelize-typescript";
import { user } from "./user";

@Table
export class category extends Model<category>{


    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    name:string = ""

    @Column({
        type:DataType.STRING,
        allowNull: false,
        unique: true
    })
    slug:string = ""



  @ForeignKey(()=>user)
        @Column({
            type: DataType.INTEGER,
            allowNull: false
        })
        userId?: number

    @BelongsTo(()=>user)
    user?: user;

}