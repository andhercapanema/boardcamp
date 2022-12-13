import CustomersRepository from "../repositories/customersRepository.js";
import { format } from "date-fns";

const {
    postNewCustomer,
    getAllCustomersByFilters,
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
    const { cpf, offset, limit, order, desc } = req.query;

    try {
        const customers = await getAllCustomersByFilters(
            cpf,
            offset,
            limit,
            order,
            desc
        );

        const formattedCustomer = customers.map((customer) => ({
            ...customer,
            birthday: format(customer.birthday, "yyyy-MM-dd"),
        }));

        res.send(formattedCustomer);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;

    try {
        const customer = await getCustomerByIdFromDb(id);

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
        res.send();
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
