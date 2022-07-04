import { findUser } from '../db/database.js';
import bcrypt from 'bcrypt';

async function login(req, res) {
    try {
        const user = res.locals.user;

        const dbUser = await findUser(user);
        
        if(dbUser === '404') {
            res.status(404).send('Usuário ou senha incorreto!');
            return;
        }

        const correctPassword = bcrypt.compareSync(user.password, dbUser.password)

        if(!correctPassword) {
            res.status(404).send('Usuário ou senha incorreto!');
            return;
        }

        res.sendStatus(200)
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }

}

export default login;