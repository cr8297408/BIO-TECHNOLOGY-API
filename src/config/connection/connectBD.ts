import { Sequelize } from 'sequelize-typescript';
import config from '@/config/env/index';
import {User} from '../../components/user.model';

const sequelize = new Sequelize({
    database: config.database.DB_NAME,
    username: config.database.DB_USER,
    password: config.database.DB_PASS,
    host: config.database.DB_HOST,
    dialect: 'mysql',
    models: [User],
});

export default sequelize;