import { postEntries } from '../db/database.js';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

async function transaction(req, res) {
    try {
        const entry = res.locals.entry;
        const user = res.locals.user;
        const date = dayjs().format('DD/MM');

        await postEntries(entry, user, date);
        
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

export default transaction;