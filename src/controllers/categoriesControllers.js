import CategoriesRepository from "../repositories/categoriesRepository.js";

const { getAllCategories, postNewCategory } = CategoriesRepository;

export async function getCategories(req, res) {
    try {
        const categories = await getAllCategories();

        if (categories.length === 0)
            return res
                .status(404)
                .send({ message: "Nenhuma categoria cadastrada!" });

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
