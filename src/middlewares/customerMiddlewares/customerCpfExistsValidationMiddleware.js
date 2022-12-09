import CustomersRepository from "../../repositories/customersRepository.js";

export default async function customerCpfExistsValidation(req, res, next) {
    const { cpf } = res.locals.newCustomer;

    console.log(cpf);

    try {
        const customer = await CustomersRepository.getCustomerByCpf(cpf);

        console.log("customer: ", customer);

        if (customer.rowCount > 0)
            return res
                .status(409)
                .send({
                    message:
                        "Já existe um cliente cadastrado com esse CPF, favor inserir outro!",
                });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    next();
}
