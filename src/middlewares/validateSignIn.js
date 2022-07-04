import signIn from "../models/signIn.js";

async function validateSignIn(req, res, next) {
    try {
        const user = req.body;
        const joiValidate = await signIn(user);

        if(!joiValidate) {
            console.log('Falha na validação JOI signIn()');
            res.send("Insira um email e senha válido!").status(422);
            return;
        }

        res.locals.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export default validateSignIn;