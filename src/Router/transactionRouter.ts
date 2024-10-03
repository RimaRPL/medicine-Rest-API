import { Router } from "express";
import { createTransaction, deleteTransaction, readTransaction, updateTransaction } from "../Controller/transactionController";
import { createValidation, updateValidation } from "../Middleware/transactionValidation";
import { verifyToken } from "../Middleware/authorization";

const router = Router()
router.post(`/`,[verifyToken,createValidation], createTransaction)

router.get(`/`, [verifyToken],readTransaction)

router.put(`/:id`, [verifyToken, updateValidation], updateTransaction)

router.delete(`/:id`, [verifyToken], deleteTransaction)


export default router