import { Column, DataType, Table,Model, ForeignKey, BelongsTo, HasMany, BelongsToMany } from "sequelize-typescript";
import { user } from "./user";
import { comment } from "./comment";
import { tag } from "./tag";
import { postTag } from "./postTag";
import { category } from "./category";

@Table
export class post extends Model<post>{

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    declare title: string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    declare content: string;

    @Column({
        type:DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare slug:string;


    @ForeignKey(()=>user)
    @Column({
        type:DataType.INTEGER,
        allowNull: false
    })
    declare userId?: number;


    @ForeignKey(()=>category)
    @Column({
        type:DataType.INTEGER,
        allowNull: false
    })
    declare categoryId?: number;


    @BelongsTo(()=>user)
    declare user?: user;

    @BelongsTo(()=>category)
    declare category?: category;

    //un post peut avoir plusieurs comment (post 1-n comment)
    @HasMany(()=>comment)
    comments: comment[] = []

    @BelongsToMany(()=>tag, ()=>postTag)
    tags: tag[] = []

}
