import UserService from '@/components/User2/service';

import * as bcrypt from 'bcrypt';

const comparePassword = async function (candidatePassword: string, id: string): Promise<boolean> {
    try {

        const user = UserService.findOne(id);

        const match: boolean = await bcrypt.compare(candidatePassword, user);

        return match;
    } catch (error) {
        return error;
    }
};

export comparePassword;