'use strict';

import { IProfileUser } from './interfaces';
import { Table, Column, Model,  CreatedAt, UpdatedAt, ForeignKey, Default, PrimaryKey } from 'sequelize-typescript'
import { UUIDV4, NOW } from 'sequelize';

import {Rol} from '../Rol/model';
export type AuthToken = {
    accessToken: string;
    kind: string;
};

@Table({
  timestamps: false,
  tableName: "user"
})
export class User extends Model {
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

  @CreatedAt
  @Default(NOW())
  @Column
  createdAt?: Date;
  
  @Default(NOW())
  @UpdatedAt
  @Column
  updatedAt?: Date;
  
  profile: IProfileUser;
}
