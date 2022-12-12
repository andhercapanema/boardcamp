import joi from "joi";

const rentalsSchema = joi.object({
    customerId: joi.number().integer().required().greater(0),
    gameId: joi.number().integer().required().greater(0),
    daysRented: joi.number().integer().required().greater(0),
});

export default rentalsSchema;
