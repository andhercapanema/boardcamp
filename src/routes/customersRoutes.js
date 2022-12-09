import { Router } from "express";
import {
    getCustomers,
    postCustomer,
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

export default router;
