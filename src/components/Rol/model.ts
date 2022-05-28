// import { IPermissions } from './interfaces';
'use strict';
import { Table, Column, Model, Default, PrimaryKey, DataType} from 'sequelize-typescript'
import { UUIDV4 } from 'sequelize';

@Table({
  timestamps: true,
  tableName: "rol"
})
export class Rol extends Model<Rol> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  id: string;

  @Column
  name: string;
  
  @Column(DataType.JSON)
  permissions: any;

}