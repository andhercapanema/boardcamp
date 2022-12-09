import joi from "joi";

const customersSchema = joi.object({
    name: joi.string().required().trim(),
    phone: joi
        .string()
        .required()
        .min(10)
        .max(11)
        .pattern(/^[0-9]+$/),
    cpf: joi
        .string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    birthday: joi.date().required(),
});

export default customersSchema;
