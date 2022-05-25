import { IRolModel, IPermissions } from "./interfaces";
import { Model, UUIDV4 } from 'sequelize';

const RolModel = (sequelize: any, DataTypes: any) => {
    class Rol extends Model<IRolModel> implements IRolModel {
        id: string;
        name: string;
        permissions: IPermissions;
    };
    Rol.init({
        id: {
            type: DataTypes.STRING,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        permissions: {
            type: DataTypes.JSON,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'rol',
    })

    return Rol;
}

export default RolModel;