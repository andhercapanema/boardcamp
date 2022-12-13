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
    getTotalRevenue,
    getRentalsAmount,
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
    const {
        customerId,
        gameId,
        offset,
        limit,
        order,
        desc,
        status,
        startDate,
    } = req.query;

    try {
        const rentals = await getAllRentalsByFilters(
            customerId,
            gameId,
            offset,
            limit,
            order,
            desc,
            startDate
        );

        const handleStatus = {
            open: (returnStatus) => returnStatus === null,
            closed: (returnStatus) => returnStatus !== null,
            undefined: () => true,
        };
        const filteredRentals = rentals.filter((rental) =>
            handleStatus[status](rental.returnDate)
        );

        const formattedCustomers = [];

        for (const rental of filteredRentals) {
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

export async function getRentalsMetrics(req, res) {
    const { startDate, endDate } = req.query;

    try {
        const revenue = await getTotalRevenue({ startDate, endDate });
        const rentals = await getRentalsAmount({ startDate, endDate });

        res.send({
            revenue,
            rentals,
            average: revenue / rentals,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
