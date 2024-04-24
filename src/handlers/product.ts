import { Request, Response } from 'express'
import Product from '../models/Product.model'
import {check, validationResult} from 'express-validator'


export const createProduct = async (req: Request, res: Response) => {


    await check('name').notEmpty().withMessage('El nombre del Producto no debe ir vacio').run(req)
    await check('price')
    .notEmpty().withMessage('El precio del Producto no debe ir vacio')
    .isNumeric().withMessage('Valor no Válido')
    .custom(value => value > 0).withMessage('Precio no válido')
    .run(req)

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }

    const product = await Product.create(req.body)

    res.json({
        status: 201,
        data: product
    }).status(201)
}

