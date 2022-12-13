import CategoriesRepository from "../repositories/categoriesRepository.js";

const {
    getAllCategories,
    postNewCategory,
    getAllCategoriesOffset,
    getAllCategoriesLimit,
    getAllCategoriesOffsetAndLimit,
} = CategoriesRepository;

export async function getCategories(req, res) {
    const { offset, limit } = req.query;

    try {
        let categories = [];

        if (offset === undefined) {
            if (limit === undefined) {
                categories = await getAllCategories();
            } else {
                categories = await getAllCategoriesLimit(limit);
            }
        } else {
            if (limit === undefined) {
                categories = await getAllCategoriesOffset(offset);
            } else {
                categories = await getAllCategoriesOffsetAndLimit(
                    offset,
                    limit
                );
            }
        }

        if (categories.length === 0)
            return res
                .status(404)
                .send({ message: "Nenhuma categoria encontrada!" });

        res.send(categories);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function postCategory(req, res) {
    const { name } = res.locals;

    try {
        await postNewCategory(name);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
