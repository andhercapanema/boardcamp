import customersSchema from "../../models/customersModel.js";

export default function customerBodyValidation(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;

    const newCustomer = { name, phone, cpf, birthday };

    const { value, error } = customersSchema.validate(newCustomer, {
        abortEarly: false,
    });

    if (error !== undefined)
        return res
            .status(400)
            .send(error.details.map((detail) => detail.message));

    res.locals.newCustomer = {
        name: value.name,
        ...newCustomer,
    };

    next();
}
