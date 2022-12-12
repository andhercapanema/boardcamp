import RentalsRepository from "../../repositories/rentalsRepository.js";

export default async function rentalWasNotReturnedValidation(req, res, next) {
    const { id } = req.params;

    const rental = await RentalsRepository.getRentalById(id);

    if (rental.returnDate !== null)
        res.status(400).send({
            message:
                "A locação correspondente já foi devolvida, favor inserir outro ID!",
        });

    next();
}
