import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        DB_USER?: string;
        DB_NAME?: string;
        DB_PASS?: string;
        DB_HOST?: string;
        MONGODB_URI: string;
        MONGODB_DB_MAIN: string;
    };
    secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        DB_NAME: process.env.DB_NAME,
        DB_PASS: process.env.DB_PASS,
        DB_USER: process.env.DB_USER,
        DB_HOST: process.env.DB_HOST,
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'example_db',
    },
    secret: process.env.SECRET || 'secret',
};

const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'example_db',
    },
    secret: process.env.SECRET || 'secret',
};

const test: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
        MONGODB_DB_MAIN: `${(process.env.MONGODB_DB_MAIN || 'example_db')}_test`,
    },
    secret: process.env.SECRET || 'secret',
};

const config: {
    [name: string]: IConfig;
} = {
    test,
    development,
    production,
};

export default config[NODE_ENV];
