import { getEntries } from "../db/database.js";

async function getBalance(req, res) {
    try {
        const user = res.locals.user;
        const entries = await getEntries(user);
        let balance = 0;

        for(let i = 0; i < entries.length; i++) {
            if(entries[i].type === "plus") {
                balance += Number(entries[i].amount);
            } else {
                balance -= Number(entries[i].amount);
            }
            
        }

        res.status(200).send({balance});
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export default getBalance;