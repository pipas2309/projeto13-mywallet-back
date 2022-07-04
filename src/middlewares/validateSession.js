import { session } from "../db/database.js";

async function validateSession(req, res, next) {
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token) {
        return res.status(498).send("Token expired/invalid");
    }

    const sessionDb = await session(token)

    if(sessionDb === 'error') {
        return res.sendStatus(401);
    }

    if(sessionDb === 'catch error') {
        return res.sendStatus(500);
    }

    res.locals.user = sessionDb;

    next();
}

export default validateSession;