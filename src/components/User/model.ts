// import { Json } from 'sequelize/types/utils';
'use strict';

// import { IProfileUser } from './interfaces';
import { Table, Column, Model, ForeignKey, Default, PrimaryKey, DataType } from 'sequelize-typescript'
import { UUIDV4 } from 'sequelize';

import {Rol} from '../Rol/model';
export type AuthToken = {
    accessToken: string;
    kind: string;
};

@Table({
  timestamps: true,
  tableName: "user"
})
export class User extends Model<User> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  id!: string;
  
  @Column
  name!: string;
  
  @Column
  email!: string;
  
  @Column
  password!: string;
  
  @Column
  passwordResetToken?: string;
  
  @Column
  passwordResetExpires?: Date;

  @Column
  facebook!: string;
  
  @Column
  token?: string;
  
  @Default(true)
  @Column
  isActive?: boolean;
  
  @ForeignKey(() => Rol)
  idRol?: string;
  
  @Default(false)
  @Column
  isAdmin?: boolean;

  @Column(DataType.JSON)
  profile?: any;
  
}
