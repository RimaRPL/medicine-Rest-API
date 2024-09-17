import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import { number } from "joi";
/** create object of prisma */
const prisma = new PrismaClient({errorFormat:"minimal"})
type DrugType = "Syrup" | "Tablet" | "Powder"

/** CREAT */
const createMedicine = async (req: Request, res: Response) => {
    try {
        const name = req.body.name
        const stock: number = Number(req.body.stock)
        const exp_date: Date = new Date(req.body.exp_date)
        const price: number = Number(req.body.price)
        const type: DrugType = req.body.type

        /** save anew medicine to DB */
        const newMedicine = await prisma.medicine.create({
            data: {
                name, stock, exp_date, price, type
            }
        })
        return res.status(200)
        .json ({
            message: `New medicine has been created`,
            data: newMedicine
        })
    } catch (error) {
        return res.status(500)
            .json(error)
        
    }
}

/** READ */
const readMedicine = async (
    req: Request,
    res: Response
) => {
    try {
        /** for search medicine */
        const search = req.query.search
        /** get all medicine */
        const allMedicine= await prisma.medicine
            .findMany({
                where:{
                    OR: [
                        {name: {
                            contains: search?.toString()|| ""
                        }}
                    ]
                }
            })
        return res.status(200).json({
            message: `Medicine has been retrivied`,
            data: allMedicine
        })
    } catch (error) {
        res.status(200).json(error)
    }
}

/**UPDATE */
const updateMedicine = async (req: Request, res: Response) => {
    try {
        /** read "id" of medicine that sent at
         * parameter URL
         */
        const id = req.params.id

        /** check existing medicine based on id */
        const findMedicine = await prisma.medicine
            .findFirst({
                where: {id: Number(id)}
            })
        
        if(!findMedicine){
            return res.status(200)
            .json({
                message: `Medicine is not found`
            })
        }
        /** ! is mean not */

        /**read property of medicine from req.body */
        const {
            name, stock, price, exp_date, type
        } = req.body

       /** update medicine */
       const saveMedicine = await prisma.medicine
            .update({
                where: {id: Number(id)},
                data: {
                    name: name ? name: findMedicine.name,
                    stock: stock ? Number(stock) : findMedicine.stock,
                    price: price ? Number(price) : findMedicine.price,
                    exp_date: exp_date ? new Date(exp_date) : findMedicine.exp_date,
                    type: type ? type : findMedicine.type


                }
            })

            return res.status(200)
                .json({
                    message: `Medicine has been updated`,
                    data: saveMedicine
                })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

/**DELETE */
const deleteMedicine = async (req: Request, res: Response) => {
    try {
        /** read id of medicine from  0*/
        const id = req.params.id

        const findMedicine = await prisma.medicine
            .findFirst({
                where: {id: Number(id)}
            })

        if (!findMedicine){
            return res.status(200)
            .json({
                message: `Medicine is not found`
            })
        }

        const saveMedicine = await prisma.medicine
            .delete({ 
                where: {id: Number(id)}
            })

        return res.status(200)
            .json({
                message: `Medicine has been removed`,
                data: saveMedicine
        })

    } catch (error) {
        return res.status(500)
        .json(error)
    }
}


export{ createMedicine, readMedicine, updateMedicine, deleteMedicine}