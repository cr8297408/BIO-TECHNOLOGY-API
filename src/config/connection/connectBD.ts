import { Sequelize } from 'sequelize';
import config from '@/config/env/index';

const data = config.database;

const db = new Sequelize(data.DB_NAME, data.DB_USER, data.DB_PASS, {
    host: data.DB_HOST,
    dialect: 'mysql',
});

export default db;