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
    getAllCustomers: async () => {
        const customers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers;`
        );
        return customers.rows;
    },
    getCustomersByCpf: async (cpf) => {
        const filteredCustomers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            WHERE
                cpf
            LIKE
                $1 || '%';`,
            [cpf]
        );
        return filteredCustomers.rows;
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
    getAllCustomersOffset: async (offset) => {
        const customers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            OFFSET
                $1;`,
            [offset]
        );
        return customers.rows;
    },
    getAllCustomersLimit: async (limit) => {
        const customers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            LIMIT
                $1;`,
            [limit]
        );
        return customers.rows;
    },
    getAllCustomersOffsetAndLimit: async (offset, limit) => {
        const customers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            LIMIT
                $1
            OFFSET
                $2;`,
            [limit, offset]
        );
        return customers.rows;
    },
    getCustomersByCpfOffset: async (cpf, offset) => {
        const filteredCustomers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            WHERE
                cpf
            LIKE
                $1 || '%'
            OFFSET
                $2;`,
            [cpf, offset]
        );
        return filteredCustomers.rows;
    },
    getCustomersByCpfLimit: async (cpf, limit) => {
        const filteredCustomers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            WHERE
                cpf
            LIKE
                $1 || '%'
            LIMIT
                $2;`,
            [cpf, limit]
        );
        return filteredCustomers.rows;
    },
    getCustomersByCpfOffsetAndLimit: async (cpf, offset, limit) => {
        const filteredCustomers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            WHERE
                cpf
            LIKE
                $1 || '%'
            LIMIT
                $2
            OFFSET
                $3;`,
            [cpf, limit, offset]
        );
        return filteredCustomers.rows;
    },
};

export default CustomersRepository;
