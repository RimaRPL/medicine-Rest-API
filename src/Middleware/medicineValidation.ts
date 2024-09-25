
import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import path from "path"
import { ROOT_DIRECTORY } from "../config"
import fs from "fs"

/** create a rule/schema 
 * for add new medicine
 */

const createSchema = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(1).required(),
    exp_date: Joi.date().required(),
    type: Joi.string().valid("Syrup","Tablet", "Powder").required()
})

const createValidation = (
    req: Request,
    res: Response,
    next: NextFunction

) => {
    const validation = createSchema.validate(req.body)
    if(validation.error){
        /** delete current uploaded file */
        let fileName: string = req.file?.filename || ``
        let pathfile: string = path.join(ROOT_DIRECTORY, "public","medicine-photo",fileName) 
        
        let fileExists = fs.existsSync(pathfile)

        if (fileExists && fileName !== ``){
            fs.unlinkSync(pathfile)
        }
        return res.status(400)
        .json({
            message: validation
            .error
            .details
            .map(it => it.message).join()
        })
    }
    return next()
}


/** create a rule/schema 
 * for update new medicine
 */

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    stock: Joi.number().min(0).optional(),
    price: Joi.number().min(1).optional(),
    exp_date: Joi.date().optional(),
    type: Joi.string().valid("Syrup","Tablet", "Powder").optional()
})

const updateValidation = (
    req: Request,
    res: Response,
    next: NextFunction

) => {
    const validation = updateSchema.validate(req.body)
    if(validation.error){
        /** delete current uploaded file */
        let fileName: string = req.file?.filename || ``
        let pathfile: string = path.join(ROOT_DIRECTORY, "public","medicine-photo",fileName) 
            
        let fileExists = fs.existsSync(pathfile)
    
        if (fileExists && fileName !== ``){
           fs.unlinkSync(pathfile)
        }
        
        return res.status(400)
        .json({
            message: validation
            .error
            .details
            .map(it => it.message).join()
        })
    }
    return next()
}

export{ createValidation, updateValidation}
