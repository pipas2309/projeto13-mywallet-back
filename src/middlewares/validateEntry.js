import xxx from '../models/entry.js';

async function validateEntry(req, res, next) {
    try {
        const entry = req.body;
        const joiValidate = await xxx(entry);

        if(!joiValidate) {
            console.log('Falha na validação JOI signIn()');
            res.status(422).send("Quer depositar letras?\n Tá acumulando pra fazer uma sopa?");
            return;
        }

        res.locals.entry = entry;
        console.log('tudo certo no vali entry')
        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }
}

export default validateEntry;