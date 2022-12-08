import connectionDB from "../database/db.js";

const CategoriesRepository = {
    getAllCategories: async () => {
        const categories = await connectionDB.query(
            "SELECT * FROM categories;"
        );
        return categories.rows;
    },
    postNewCategory: async (name) => {
        await connectionDB.query("INSERT INTO categories (name) VALUES ($1);", [
            name,
        ]);
    },
    getCategoryByName: async (name) => {
        const category = await connectionDB.query(
            "SELECT * FROM categories WHERE name=$1;",
            [name]
        );
        return category;
    },
};

export default CategoriesRepository;
