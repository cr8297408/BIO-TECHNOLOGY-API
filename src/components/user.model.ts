import {Model, Table, Column} from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column name!: string;
    @Column apellido: string;
}