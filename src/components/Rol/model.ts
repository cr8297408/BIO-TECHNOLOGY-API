import { IPermissions } from './interfaces';
'use strict';
import { Table, Column, Model, CreatedAt, UpdatedAt, Default, PrimaryKey} from 'sequelize-typescript'
import { UUIDV4, NOW } from 'sequelize';

@Table({
  timestamps: false,
  tableName: "rol"
})
export class Rol extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  id: string;

  @Column
  name: string;
  
  permissions: IPermissions;
  
  @CreatedAt
  @Default(NOW())
  @Column
  createdAt?: Date;
  
  @UpdatedAt
  @Default(NOW())
  @Column
  updatedAt?: Date;
}