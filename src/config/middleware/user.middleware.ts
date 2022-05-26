import {User} from '@/components/User/model';
import db from '../connection/connectBD';

import * as bcrypt from 'bcrypt';

const comparePassword = async function (body: User): Promise<boolean> {
    try {

        const password= await db.query('SELECT password FROM users WHERE id= ?', {
            replacements: [body.id],
        })

        const match: boolean = await bcrypt.compare(body.password, password.toString() );

        return match;
    } catch (error) {
        return error;
    }
};

export default comparePassword;