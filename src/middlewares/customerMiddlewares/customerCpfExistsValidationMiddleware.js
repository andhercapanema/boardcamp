import CustomersRepository from "../../repositories/customersRepository.js";

export default async function customerCpfExistsValidation(req, res, next) {
    const { cpf } = res.locals.newCustomer;
    const id = req.params.id || -1;
    const methodIsPost = req.route?.methods.post !== undefined;
    const methodIsPut = req.route?.methods.put !== undefined;

    try {
        const customer = await CustomersRepository.getCustomerByCpf(cpf);
        const cpfAlreadyExists = customer.rowCount > 0;
        const isUpdatingTheSameCustomer = customer.rows[0]?.id === +id;

        if (
            (methodIsPost && cpfAlreadyExists) ||
            (methodIsPut && cpfAlreadyExists && !isUpdatingTheSameCustomer)
        )
            return res.status(409).send({
                message:
                    "Já existe um cliente cadastrado com esse CPF, favor inserir outro!",
            });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    next();
}
