import { createUser, findUser } from '../db/database.js';
import validateSignIn from '../middlewares/validateSignIn.js';

async function newUser(req, res) {
    const user = res.locals.user;

    try {
        const created = await createUser(user);

        if(created === 'alreadyExist') {
            res.sendStatus(409);
            return;
        }

        res.sendStatus(201);
        return;

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export default newUser;