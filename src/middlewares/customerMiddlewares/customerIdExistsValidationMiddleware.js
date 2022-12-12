import CustomersRepository from "../../repositories/customersRepository.js";

export default async function customerIdExistsValidation(req, res, next) {
    const { customerId } = req.body;

    try {
        const customer = await CustomersRepository.getCustomerByIdFromDb(
            customerId
        );

        if (customer === undefined)
            return res
                .status(400)
                .send({
                    message:
                        "Não existe nenhum cliente com esse ID, favor inserir outro!",
                });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    next();
}
