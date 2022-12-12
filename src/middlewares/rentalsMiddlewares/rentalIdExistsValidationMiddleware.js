import RentalsRepository from "../../repositories/rentalsRepository.js";

export default async function rentalIdExistsValidation(req, res, next) {
    const { id } = req.params;

    const rental = await RentalsRepository.getRentalById(id);

    if (rental === undefined)
        return res.status(404).send({
            message:
                "O ID inserido não corresponde a nenhuma locação, favor inserir outro!",
        });

    next();
}
