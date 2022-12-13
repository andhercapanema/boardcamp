import CustomersRepository from "../repositories/customersRepository.js";
import GamesRepository from "../repositories/gamesRepository.js";
import RentalsRepository from "../repositories/rentalsRepository.js";
import { format } from "date-fns";

const {
    postNewRental,
    getAllRentalsByFilters,
    updateRentalReturnDate,
    updateRentalDelayFee,
    deleteSpecificRental,
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
    const { customerId, gameId, offset, limit, order, desc } = req.query;

    try {
        const rentals = await getAllRentalsByFilters(
            customerId,
            gameId,
            offset,
            limit,
            order,
            desc
        );

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

export async function returnGame(req, res) {
    const { id } = req.params;

    try {
        await updateRentalReturnDate(id);
        await updateRentalDelayFee(id);

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;

    try {
        await deleteSpecificRental(id);
        res.send();
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
