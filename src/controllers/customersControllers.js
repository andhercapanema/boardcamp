import CustomersRepository from "../repositories/customersRepository.js";

const { postNewCustomer, getAllCustomers, getCustomersByCpf } =
    CustomersRepository;

export async function postCustomer(req, res) {
    const { newCustomer } = res.locals;

    try {
        await postNewCustomer(newCustomer);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getCustomers(req, res) {
    const { cpf } = req.query;

    try {
        if (cpf !== undefined) return res.send(await getCustomersByCpf(cpf));

        res.send(await getAllCustomers());
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
