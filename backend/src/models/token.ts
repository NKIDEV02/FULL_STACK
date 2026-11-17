import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { user } from "./user";
import { access } from "node:fs";


@Table //({ tableName: 'tokens' }) // <-- Indispensable pour sequelize-typescript
export class Token extends Model<Token>{

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    declare token?: string;

    
    @Column({
        type:DataType.ENUM("activation", "reset", 'access', 'refresh'),
        allowNull: false
    })
    declare type?: "activation" | "reset" | "access" | "refresh";



    @ForeignKey(()=>user)
    @Column({
        type:DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @BelongsTo(()=>user)
    declare user?: user;


}