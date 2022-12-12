import CustomersRepository from "../repositories/customersRepository.js";
import GamesRepository from "../repositories/gamesRepository.js";
import RentalsRepository from "../repositories/rentalsRepository.js";
import { format } from "date-fns";

const {
    postNewRental,
    getAllRentals,
    getRentalsByCustomerId,
    getRentalsByGameId,
    getRentalsByCustomerAndGameId,
} = RentalsRepository;

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

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query;

    try {
        let rentals = [];

        if (customerId === undefined) {
            if (gameId === undefined) {
                rentals = await getAllRentals();
            } else {
                rentals = await getRentalsByGameId(gameId);
            }
        } else {
            if (gameId === undefined) {
                rentals = await getRentalsByCustomerId(customerId);
            } else {
                rentals = await getRentalsByCustomerAndGameId(
                    customerId,
                    gameId
                );
            }
        }

        const formattedCustomers = [];

        for (const rental of rentals) {
            formattedCustomers.push({
                ...rental,
                rentDate: format(rental.rentDate, "yyyy-MM-dd"),
                customer: await CustomersRepository.getCustomerByIdNameAndId(
                    rental.customerId
                ),
                game: await GamesRepository.getGameByIdNameIdCategoryIdCategoryName(
                    rental.gameId
                ),
            });
        }

        res.send(formattedCustomers);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
