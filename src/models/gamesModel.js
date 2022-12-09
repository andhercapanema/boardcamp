import joi from "joi";

const gamesSchema = joi.object({
    name: joi.string().required().trim(),
    image: joi.string().uri().required().trim(),
    stockTotal: joi.number().integer().required().greater(0),
    categoryId: joi.number().integer().required().greater(0),
    pricePerDay: joi.number().integer().required().greater(0),
});

export default gamesSchema;
