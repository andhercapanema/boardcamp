import RentalsRepository from "../repositories/rentalsRepository.js";

const { postNewRental } = RentalsRepository;

export async function postRental(req, res) {
    const { newRental } = res.locals;

    try {
        await postNewRental(newRental);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
