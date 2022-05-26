import { Rol } from '@/components/Rol/model';
import { User } from '@/components/User/model';
import { Sequelize } from 'sequelize-typescript';
import config from '@/config/env/index';

const data = config.database;

const db = new Sequelize(data.DB_NAME, 
    data.DB_USER,
    data.DB_PASS, 
    {
        host: data.DB_HOST,
        dialect: 'mysql',
        models: [User, Rol]
    }
);

(async () => {
    await db.sync();        
    console.log(db.models);
    
})();


export default db;