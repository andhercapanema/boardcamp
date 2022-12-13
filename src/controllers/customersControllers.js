import CustomersRepository from "../repositories/customersRepository.js";
import { format } from "date-fns";

const {
    postNewCustomer,
    getAllCustomers,
    getCustomersByCpf,
    getCustomerByIdFromDb,
    updateCustomer,
    getAllCustomersOffset,
    getAllCustomersLimit,
    getAllCustomersOffsetAndLimit,
    getCustomersByCpfOffset,
    getCustomersByCpfLimit,
    getCustomersByCpfOffsetAndLimit,
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
    const { cpf, offset, limit } = req.query;

    const cpfDefined = cpf !== undefined;
    const offsetDefined = offset !== undefined;
    const limitDefined = limit !== undefined;

    try {
        let customers = [];

        if (cpfDefined && offsetDefined && limitDefined) {
            customers = await getCustomersByCpfOffsetAndLimit(
                cpf,
                offset,
                limit
            );
        }

        if (cpfDefined && offsetDefined && !limitDefined) {
            customers = await getCustomersByCpfOffset(cpf, offset);
        }

        if (cpfDefined && !offsetDefined && limitDefined) {
            customers = await getCustomersByCpfLimit(cpf, limit);
        }

        if (cpfDefined && !offsetDefined && !limitDefined) {
            customers = await getCustomersByCpf(cpf);
        }

        if (!cpfDefined && offsetDefined && limitDefined) {
            customers = await getAllCustomersOffsetAndLimit(offset, limit);
        }

        if (!cpfDefined && offsetDefined && !limitDefined) {
            customers = await getAllCustomersOffset(offset);
        }

        if (!cpfDefined && !offsetDefined && limitDefined) {
            customers = await getAllCustomersLimit(limit);
        }

        if (!cpfDefined && !offsetDefined && !limitDefined) {
            customers = await getAllCustomers();
        }

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
