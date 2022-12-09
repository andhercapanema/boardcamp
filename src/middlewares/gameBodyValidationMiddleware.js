import gamesSchema from "../models/gamesModel.js";

export default function gameBodyValidation(req, res, next) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const newCategory = { name, image, stockTotal, categoryId, pricePerDay };

    const { value, error } = gamesSchema.validate(newCategory, {
        abortEarly: false,
    });

    if (error !== undefined)
        return res
            .status(400)
            .send(error.details.map((detail) => detail.message));

    res.locals.newCategory = {
        name: value.name,
        image: value.image,
        ...newCategory,
    };

    next();
}
