import RentalsRepository from "../../repositories/rentalsRepository.js";

export default async function rentalWasReturnedValidation(req, res, next) {
    const { id } = req.params;

    const rental = await RentalsRepository.getRentalById(id);

    if (rental.returnDate === null)
        res.status(400).send({
            message:
                "A locação correspondente ainda não foi finalizada, favor finalizá-la antes de executar sua exclusão!",
        });

    next();
}
