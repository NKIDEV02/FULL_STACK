import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";

@Table
export class user extends Model {
    @Column(DataType.STRING) 
    name: string = '';
}