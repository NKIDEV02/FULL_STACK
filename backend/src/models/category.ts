import { Column, DataType, Model, Table } from "sequelize-typescript";

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

}