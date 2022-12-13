import connectionDB from "../database/db.js";

const CustomersRepository = {
    postNewCustomer: async ({ name, phone, cpf, birthday }) => {
        await connectionDB.query(
            `INSERT INTO
                customers
                (name, phone, cpf, birthday)
            VALUES
                ($1, $2, $3, $4);`,
            [name, phone, cpf, birthday]
        );
    },
    getAllCustomersByFilters: async (cpf = "", offset, limit, order, desc) => {
        const filteredCustomers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            WHERE
                cpf
            LIKE
                $1 || '%'
            ORDER BY
                ${order}
            ${desc ? "DESC" : ""}
            LIMIT
                $2
            OFFSET
                $3;`,
            [cpf, limit, offset]
        );
        return filteredCustomers.rows;
    },
    getCustomerByCpf: async (cpf) => {
        return await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            WHERE
                cpf=$1;`,
            [cpf]
        );
    },
    getCustomerByIdFromDb: async (id) => {
        const customer = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            WHERE
                id = $1;`,
            [id]
        );
        return customer.rows[0];
    },
    updateCustomer: async (id, { name, phone, cpf, birthday }) => {
        await connectionDB.query(
            `UPDATE
                customers
            SET
                name = $1, phone = $2, cpf = $3, birthday = $4
            WHERE
                id = $5;`,
            [name, phone, cpf, birthday, id]
        );
    },
    getCustomerByIdNameAndId: async (id) => {
        const customer = await connectionDB.query(
            `SELECT
                id, name
            FROM
                customers
            WHERE
                id = $1;`,
            [id]
        );
        return customer.rows[0];
    },
};

export default CustomersRepository;
