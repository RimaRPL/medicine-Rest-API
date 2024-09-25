import { Router } from "express";
import { authentication, creatAdmin, deleteAdmin, readAdmin, updateAdmin } from "../Controller/adminController";
import { authValidation, createValidation, updateValidation } from "../Middleware/adminValidation";
import { verifyToken } from "../Middleware/authorization";

const router = Router ()

router.post(`/`,[verifyToken,createValidation],creatAdmin)

/** route for read medicine, untuk read menggunakan get*/
router.get(`/`, [verifyToken],readAdmin)

/**route for update medicine , untuk update use put */
router.put(`/:id`,[verifyToken,updateValidation], updateAdmin)

/**route for delete medicine , untuk delete use delete*/
router.delete(`/:id`, [verifyToken],deleteAdmin)

router.post(`/auth`, [authValidation] ,authentication)


export default router