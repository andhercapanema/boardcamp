import joi from "joi";

const categoriesSchema = joi.object({
    name: joi.string().required().trim(),
});

export default categoriesSchema;
