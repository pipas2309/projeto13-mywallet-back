import { postEntries } from '../db/database.js';
import dayjs from 'dayjs';

async function transaction(req, res) {
    try {
        const entry = res.locals.entry;
        const user = res.locals.user;
        const date = dayjs().format('DD/MM');

        const response = await postEntries(entry, user, date);
        
        if(response === 'error') {
            res.sendStatus(500);
            return;
        }

        res.sendStatus(201)
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }

}

export default transaction;