import { Column, DataType, Table, Model, BelongsToMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import { post } from "./post";
import { postTag } from "./postTag";
import { user } from "./user";


@Table
export class tag extends Model<tag>{

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    declare name?: string;


    @ForeignKey(()=>user)
        @Column({
            type: DataType.INTEGER,
            allowNull: false
        })
    declare userId?: number;


    @BelongsToMany(()=>post, ()=>postTag)
        posts: post[] = []


    @BelongsTo(()=>user)
    declare user?: user;

}