import CategoriesRepository from "../repos/categoriesRepository.js";

const { getAllCategories, postNewCategory } = CategoriesRepository;

export async function getCategories(req, res) {
    try {
        const categories = await getAllCategories();
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
