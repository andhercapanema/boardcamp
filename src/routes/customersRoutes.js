import { Router } from "express";
import {
    getCustomerById,
    getCustomers,
    postCustomer,
    putCustomer,
} from "../controllers/customersControllers.js";
import customerBodyValidation from "../middlewares/customerMiddlewares/customerBodyValidationMiddleware.js";
import customerCpfExistsValidation from "../middlewares/customerMiddlewares/customerCpfExistsValidationMiddleware.js";

const router = Router();

router.post(
    "/",
    customerBodyValidation,
    customerCpfExistsValidation,
    postCustomer
);
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.put(
    "/:id",
    customerBodyValidation,
    customerCpfExistsValidation,
    putCustomer
);

export default router;
