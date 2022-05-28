import {IUser} from '@/components/User/interfaces';
import { User } from '@/components/User/model';


export default async function users() {
    try {
        const searchUser = await User.findAndCountAll()
        
       if (searchUser.count === 0) {
            for (let i = 0; i < 100; i++) {           
                const user: IUser = {
                    name: `userTest${i}`,
                    email: `test${i}@mail.com`,
                    password: `12345test`,
                    facebook: `facebook.com/userTest${i}`,
                };
    
                await User.create(user)
            }
        }
    } catch (error) {
        console.log(error.message);
        
    }
}