import categoriesSchema from "../../models/categoriesModel.js";

export default function categoryBodyValidation(req, res, next) {
    const { name } = req.body;

    const { value, error } = categoriesSchema.validate(
        { name },
        { abortEarly: false }
    );

    if (error !== undefined)
        return res
            .status(400)
            .send(error.details.map((detail) => detail.message));

    res.locals.name = value.name;

    next();
}
