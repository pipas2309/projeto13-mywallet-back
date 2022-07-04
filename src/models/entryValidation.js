import joi from 'joi';

const entrySchema = joi.object({
    username: joi.string().min(3).max(64).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(64).required()
});

async function entryValidation(entry) {
    try {
        const allowedEntry = await entrySchema.validateAsync(entry, { abortEarly: false });
        return allowedEntry;

    } catch (error) {
        console.log(error);
        return;
    }
};  

export default entryValidation;