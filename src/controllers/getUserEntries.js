import { getEntries } from "../db/database.js";

async function getUserEntries(req, res) {
    try {
        const user = res.locals.user;
        const entries = await getEntries(user);
    
        res.status(200).send(entries)
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export default getUserEntries;