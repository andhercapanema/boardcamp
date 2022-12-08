import connection from "../database/db.js";

const CategoriesRepository = {
    getAllCategories: async () => {
        const categories = await connection.query("SELECT * FROM categories;");
        return categories.rows;
    },
    postNewCategory: async (name) => {
        await connection.query("INSERT INTO categories (name) VALUES ($1);", [
            name,
        ]);
    },
    getCategoryByName: async (name) => {
        const category = await connection.query(
            "SELECT * FROM categories WHERE name=$1;",
            [name]
        );
        return category;
    },
};

export default CategoriesRepository;
