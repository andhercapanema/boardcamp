import connection from "../database/db.js";

const CategoriesRepository = {
    getAllCategories: () => {
        return connection.query("SELECT * FROM categories;").rows;
    },
};

export default CategoriesRepository;
