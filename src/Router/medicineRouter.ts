import { Router } from "express"
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../Controller/medicineController"
import { createValidation, updateValidation } from "../Middleware/medicineValidation"

const router = Router()

/** router  for add new medicine */
router.post(`/`, [createValidation], createMedicine)

/** route for read medicine, untuk read menggunakan get*/
router.get(`/`, readMedicine)

/**route for update medicine , untuk update use put */
router.put(`/:id`, [updateValidation],updateMedicine)

/**route for delete medicine , untuk delete use delete*/
router.delete(`/:id`, deleteMedicine)

export default router