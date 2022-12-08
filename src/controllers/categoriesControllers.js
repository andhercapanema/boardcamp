import CategoriesRepository from "../repos/categoriesRepository.js";

export async function getCategories(req, res) {
    try {
        const categories = await CategoriesRepository.getAllCategories();
        res.send(categories);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
