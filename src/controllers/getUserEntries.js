import { getEntries } from "../db/database.js";

async function getUserEntries(req, res) {
    console.log('cheguei no get user entries');

    const user = res.locals.user;
    const entries = await getEntries(user);
    
    console.log(entries);

    res.status(200).send(entries)
    return;
}

export default getUserEntries;