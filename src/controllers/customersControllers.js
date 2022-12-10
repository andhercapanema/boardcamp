import CustomersRepository from "../repositories/customersRepository.js";

const {
    postNewCustomer,
    getAllCustomers,
    getCustomersByCpf,
    getCustomerByCpfFromDb,
} = CustomersRepository;

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

export async function getCustomerById(req, res) {
    const { id } = req.params;

    try {
        const customer = await getCustomerByCpfFromDb(id);

        if (customer === undefined) return res.sendStatus(404);

        res.send(customer);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
