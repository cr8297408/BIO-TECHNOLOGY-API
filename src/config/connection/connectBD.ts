// import UserModel from '../../components/User2/model';
import { Sequelize, /**DataTypes**/ } from 'sequelize';
import config from '@/config/env/index';

const data = config.database;

const db = new Sequelize(data.DB_NAME, data.DB_USER, data.DB_PASS, {
    host: data.DB_HOST,
    dialect: 'mysql',
});

(async () => {

    await db.sync();
})();


export default db;