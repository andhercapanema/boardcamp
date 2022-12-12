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

router.get("/", getCustomers);
router.get("/:id", getCustomerById);

router.use(customerBodyValidation, customerCpfExistsValidation);

router.post("/", postCustomer);
router.put("/:id", putCustomer);

export default router;
