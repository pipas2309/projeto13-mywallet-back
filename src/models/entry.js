import joi from 'joi';

const entrySchema = joi.object({
    amount: joi.number().precision(2).required(),
    description: joi.string().min(1).max(32).required(),
    type: joi.string().valid("plus", "minus").required()
});

async function entry(entry) {
    try {
        const allowedEntry = await entrySchema.validateAsync(entry, { abortEarly: false });
        return allowedEntry;

    } catch (error) {
        console.log(error);
        return;
    }
};  

export default entry;