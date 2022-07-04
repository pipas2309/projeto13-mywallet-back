import joi from 'joi';

const signupSchema = joi.object({
    username: joi.string().min(3).max(64).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(64).required()
});

async function signupValidation(signup) {
    try {
        const allowedUserData = await signupSchema.validateAsync(signup, { abortEarly: false });
        return allowedUserData;

    } catch (error) {
        console.log(error);
        return;
    }
};  

export default signupValidation;