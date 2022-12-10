import connectionDB from "../database/db.js";

const CustomersRepository = {
    postNewCustomer: async ({ name, phone, cpf, birthday }) => {
        await connectionDB.query(
            `INSERT INTO
                customers
                (name, phone, cpf, birthday)
            VALUES
                ($1, $2, $3, $4);
            `,
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
                cpf=$1;
            `,
            [cpf]
        );
    },
    getAllCustomers: async () => {
        const customers = await connectionDB.query(
            `SELECT
                *
            FROM
                customers;
            `
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
                $1 || '%';
            `,
            [cpf]
        );
        return filteredCustomers.rows;
    },
    getCustomerByCpfFromDb: async (id) => {
        const customer = await connectionDB.query(
            `SELECT
                *
            FROM
                customers
            WHERE
                id = $1;
            `,
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
                id = $5;    
            `,
            [name, phone, cpf, birthday, id]
        );
    },
};

export default CustomersRepository;
