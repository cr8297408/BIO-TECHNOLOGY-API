import { IRolModel } from './../components/Rol/interfaces';
import { Rol } from '@/components/Rol/model';

export default async function rols() {
    try {
        const searchUser = await Rol.findAndCountAll()
        if (searchUser.count === 0) {           
            const rol: IRolModel = {
                id: "idtest12345",
                name: "onlyRead",
                permissions: {
                        "nameModules": ["User", "Rol"],
                        "findAll": true,
                        "findPagination": true,
                        "findOne": true,
                        "insert": false,
                        "remove": false,
                }
            }
            await Rol.create(rol);
        }
    } catch (error) {
        console.log(error.message);
        
    }
}