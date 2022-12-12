import CustomersRepository from "../repositories/customersRepository.js";
import { format } from "date-fns";

const {
    postNewCustomer,
    getAllCustomers,
    getCustomersByCpf,
    getCustomerByIdFromDb,
    updateCustomer,
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
        if (cpf !== undefined)
            return res.send(await getCustomerByIdFromDb(cpf));

        const customers = await getAllCustomers();

        res.send(
            customers.map((customer) => ({
                ...customer,
                birthday: format(customer.birthday, "yyyy-MM-dd"),
            }))
        );
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;

    try {
        const customer = await getCustomerById(id);

        if (customer === undefined) return res.sendStatus(404);

        res.send({
            ...customer,
            birthday: format(customer.birthday, "yyyy-MM-dd"),
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function putCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    const updatedCustomer = { name, phone, cpf, birthday };

    try {
        await updateCustomer(id, updatedCustomer);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
