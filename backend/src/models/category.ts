import { Column,ForeignKey, DataType, Model, Table, BelongsTo, HasMany } from "sequelize-typescript";
import { user } from "./user";
import { post } from "./post";

@Table
export class category extends Model<category>{


    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    declare name: string; // ✅ Correction : 'declare' et pas de '= ""'

    @Column({
        type:DataType.STRING,
        allowNull: false,
        unique: true
    })
   declare slug: string; // ✅ Correction : 'declare' et pas de '= ""'



  @ForeignKey(()=>user)
        @Column({
            type: DataType.INTEGER,
            allowNull: false
        })
    declare userId: number; // ✅ Correction : 'declare'

    @BelongsTo(()=>user)
    declare user?: user; // ✅ Correction : 'declare'

    @HasMany(()=>post)
    posts: post[] = []
 
}