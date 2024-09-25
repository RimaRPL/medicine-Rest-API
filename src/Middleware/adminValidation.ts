import { join } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createSchema = Joi.object({
    nama_admin: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

const createValidation = (req: Request, res: Response, next: NextFunction) => {
    const validation = createSchema.validate(req.body)
    if(validation.error){
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

const updateSchema = Joi.object({
    nama_admin: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional()
})

const updateValidation = (req: Request, res: Response, next: NextFunction) => {
    const validation = updateSchema.validate(req.body)
    if(validation.error){
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

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const authValidation = (req: Request, res: Response, next: NextFunction) => {
    const validation = authSchema.validate(req.body)
    if(validation.error){
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

export{ createValidation, updateValidation, authValidation}