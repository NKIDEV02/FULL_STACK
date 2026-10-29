import { Column, DataType, Table,Model, ForeignKey, BelongsTo, HasMany, BelongsToMany } from "sequelize-typescript";
import { user } from "./user";
import { comment } from "./comment";
import { tag } from "./tag";
import { postTag } from "./postTag";

@Table
export class post extends Model<post>{

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    title: string=""

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    content: string=""

    @Column({
        type:DataType.STRING,
        allowNull: false,
        unique: true
    })
    slug:string = ""


    @ForeignKey(()=>user)
    @Column({
        type:DataType.INTEGER,
        allowNull: false
    })
    userId?: number;


    @BelongsTo(()=>user)
    user?: user;

    //un post peut avoir plusieurs comment (post 1-n comment)
    @HasMany(()=>comment)
    comments: comment[] = []

    @BelongsToMany(()=>tag, ()=>postTag)
    tags: tag[] = []

}
