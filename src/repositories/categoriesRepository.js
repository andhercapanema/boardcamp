import connectionDB from "../database/db.js";

const CategoriesRepository = {
    getAllCategories: async () => {
        const categories = await connectionDB.query(
            `SELECT
                *
            FROM
                categories;`
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
    getAllCategoriesOffset: async (offset) => {
        const categories = await connectionDB.query(
            `SELECT
                *
            FROM
                categories
            OFFSET
                $1;`,
            [offset]
        );
        return categories.rows;
    },
    getAllCategoriesLimit: async (limit) => {
        const categories = await connectionDB.query(
            `SELECT
                *
            FROM
                categories
            LIMIT
                $1;`,
            [limit]
        );
        return categories.rows;
    },
    getAllCategoriesOffsetAndLimit: async (offset, limit) => {
        const categories = await connectionDB.query(
            `SELECT
                *
            FROM
                categories
            LIMIT
                $1
            OFFSET
                $2;`,
            [limit, offset]
        );
        return categories.rows;
    },
};

export default CategoriesRepository;
