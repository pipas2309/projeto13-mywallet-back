import xxx from '../models/entry.js';

async function validateEntry(req, res, next) {
    try {
        const entry = req.body;
        const joiValidate = await xxx(entry);

        console.log(entry, 'entry')
        console.log(joiValidate, 'entry do joivalidate')

        if(!joiValidate) {
            console.log('Falha na validação JOI signIn()');
            res.status(422).send("Insira um email e senha válido!");
            return;
        }

        res.locals.entry = entry;
        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export default validateEntry;