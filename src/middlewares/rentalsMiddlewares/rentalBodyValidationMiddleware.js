import rentalsSchema from "../../models/rentalsModel.js";

export default async function rentalBodyValidation(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    const newRental = { customerId, gameId, daysRented };

    const { error } = rentalsSchema.validate(newRental, {
        abortEarly: false,
    });

    if (error !== undefined)
        return res
            .status(400)
            .send(error.details.map((detail) => detail.message));

    res.locals.newRental = newRental;

    next();
}
