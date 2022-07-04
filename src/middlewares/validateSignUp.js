import signUp from "../models/signUp.js";

async function validateSignUp(req, res, next) {
    try {
        const user = req.body;
        const joiValidate = await signUp(user);
        console.log(joiValidate, ' JOI')
        if(!joiValidate) {
            console.log('Falha na validação JOI signUp()');
            res.status(422).send('Insira um email e senha válidos!')
            return;
        }

        res.locals.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export default validateSignUp;