'use strict';

import { Model } from 'sequelize';

/**
 * @export
 * @interface IUserRequest
 */
 export interface IUserRequest {
    id: string;
    email: string;
}

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */

export type AuthToken = {
    accessToken: string;
    kind: string;
};


export interface IUserModel {
    id: string;
    email: string;
    name: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    facebook?: string;
    token?: string;
    isActive?: boolean;
}



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

    facebook?: string;
    token?: string;
    isActive?: boolean;
    
  };
  User.init({
    id: {
      type: DataTypes.STRING,
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
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }

  }, {
    sequelize,
    tableName: 'users',
  });
  return User;
};

export default UserModel;