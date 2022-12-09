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
                cpf=$1
            `,
            [cpf]
        );
    },
};

export default CustomersRepository;
