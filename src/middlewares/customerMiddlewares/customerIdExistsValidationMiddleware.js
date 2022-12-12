import CustomersRepository from "../../repositories/customersRepository.js";

export default async function customerIdExistsValidation(req, res, next) {
    const { customerId } = req.body;

    try {
        const customer = await CustomersRepository.getCustomerByIdFromDb(
            customerId
        );

        if (customer === undefined) return res.sendStatus(400);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    next();
}
