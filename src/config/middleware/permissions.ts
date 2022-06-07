import { Rol } from '@/components/Rol/model';
// import RolService from '@/components/Rol/service';
import config from '@/config/env/index';
import * as jwt from 'jsonwebtoken';

async function roles(bearerHeader: string){
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
        if (token){
            const decoded: any = await jwt.verify(token, config.JWT_SECRET);
            if (decoded) {

                const rol = await Rol.findByPk(decoded.idRol);
                let permissions = rol.permissions 
                return permissions;
            } 
        }
}

export default roles;