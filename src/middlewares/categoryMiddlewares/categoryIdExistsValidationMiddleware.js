import CategoriesRepository from "../../repositories/categoriesRepository.js";

export default async function categoryIdExistsValidation(req, res, next) {
    const { categoryId } = res.locals.newCategory;

    try {
        const category = await CategoriesRepository.getCategoryById(categoryId);
        const categoryExists = category.rowCount !== 0;

        if (!categoryExists)
            return res.status(400).send({
                message:
                    "O ID da categoria inserido não corresponde a nenhum registro, favor inserir um ID válido!",
            });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    next();
}
