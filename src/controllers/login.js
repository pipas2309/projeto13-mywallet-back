import { findUser } from '../db/database.js';
import bcrypt from 'bcrypt';

async function login(req, res) {
    try {
        const user = res.locals.user;

        const dbUser = findUser(user);

        if(dbUser === '404') {
            res.sendStatus(404);
        }
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }

}

export default login;