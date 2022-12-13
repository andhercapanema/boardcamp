import connectionDB from "../database/db.js";

const CategoriesRepository = {
    getAllCategoriesByFilter: async (limit, offset, order, desc) => {
        const orderBy = order ? `ORDER BY ${order}` : "";

        const categories = await connectionDB.query(
            `SELECT
                *
            FROM
                categories
            ${orderBy}
            ${desc ? "DESC" : ""}
            LIMIT
                $1
            OFFSET
                $2;`,
            [limit, offset]
        );
        return categories.rows;
    },
    postNewCategory: async (name) => {
        await connectionDB.query(
            `INSERT INTO
                categories
                (name)
            VALUES
                ($1);`,
            [name]
        );
    },
    getCategoryByName: async (name) => {
        const category = await connectionDB.query(
            `SELECT
                *
            FROM
                categories
            WHERE
                name=$1;`,
            [name]
        );
        return category;
    },
    getCategoryById: async (id) => {
        const category = await connectionDB.query(
            `SELECT
                *
            FROM
                categories
            WHERE
                id=$1;`,
            [id]
        );
        return category;
    },
};

export default CategoriesRepository;
