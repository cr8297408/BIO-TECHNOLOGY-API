'use strict';
import { IUserModel } from './interfaces';

import { Model, UUIDV4  } from 'sequelize';



export type AuthToken = {
    accessToken: string;
    kind: string;
};



const UserModel = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUserModel> 
  implements IUserModel {
    /**IUserModel
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;

    facebook!: string;
    token?: string;
    isActive?: boolean;
    idRol?: string;
    createdAt?: Date;
    updatedAt?: Date;
    
  };
  User.init({
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordResetToken: {
        type: DataTypes.STRING,
    },
    passwordResetExpires: {
        type: DataTypes.DATE,
    },
    token: {
        type: DataTypes.STRING,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    idRol: {
      type: DataTypes.STRING,
      references: {
        model: "rol",
        key: "id"
      },
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW()
    }

  }, {
    sequelize,
    tableName: 'user',
  });
  return User;
};

export default UserModel;