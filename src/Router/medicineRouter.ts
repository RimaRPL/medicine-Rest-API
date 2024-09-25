import { Router } from "express"
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../Controller/medicineController"
import { createValidation, updateValidation } from "../Middleware/medicineValidation"
import { uploadMedicinePhoto } from "../Middleware/uploadMedicinePhoto"
import { verifyToken } from "../Middleware/authorization"

const router = Router()

/** router  for add new medicine */
router.post(`/`, [verifyToken,uploadMedicinePhoto.single(`photo`),createValidation], createMedicine)

/** route for read medicine, untuk read menggunakan get*/
router.get(`/`, [verifyToken],readMedicine)

/**route for update medicine , untuk update use put */
router.put(`/:id`, [verifyToken,uploadMedicinePhoto.single(`photo`),updateValidation],updateMedicine)

/**route for delete medicine , untuk delete use delete*/
router.delete(`/:id`, [verifyToken],deleteMedicine)



export default router