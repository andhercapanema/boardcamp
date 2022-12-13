import CategoriesRepository from "../repositories/categoriesRepository.js";

const { postNewCategory, getAllCategoriesByFilter } = CategoriesRepository;

export async function getCategories(req, res) {
    const { limit, offset, order, desc } = req.query;

    try {
        const categories = await getAllCategoriesByFilter(
            limit,
            offset,
            order,
            desc
        );

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
