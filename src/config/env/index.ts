import * as dotenv from 'dotenv';
dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        DB_USER?: string;
        DB_NAME?: string;
        DB_PASS?: string;
        DB_HOST?: string;
        DB_DIALECT?: string;
    };
    JWT_SECRET: string;
    JWT_ALGORITHMS: any;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        DB_NAME: process.env.DB_NAME,
        DB_PASS: process.env.DB_PASS,
        DB_USER: process.env.DB_USER,
        DB_HOST: process.env.DB_HOST,
        DB_DIALECT: process.env.DB_DIALECT,
    },
    JWT_SECRET: process.env.SECRET || 'secret',
    JWT_ALGORITHMS: process.env.JWT_ALGORITHMS,
};

const config: {
    [name: string]: IConfig;
} = {
  development,
};

export default config[NODE_ENV];
