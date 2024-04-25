import { Request, Response } from 'express'
import Product from '../models/Product.model'



export const createProduct = async (req: Request, res: Response) => {

    const product = await Product.create(req.body)

    res.json({
        status: 201,
        data: product
    }).status(201)
}

export const getProducts = async (req: Request, res: Response) =>{
    const products = await Product.findAll({
        order:[
            ['price','ASC']
        ],
        attributes: {
            exclude:['createdAt', 'updatedAt']
        }
    })
    res.json({
        status: 200,
        data: products
    }).status(201)

}

export const getProductsById = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado '
        })
    }

    res.json({
        status: 200,
        data: product
    }).status(201)

}


export const updateProduct = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado '
        })
    }

    await product.update(req.body)
    await product.save()

    res.json({
        status: 200,
        data: product
    }).status(201)
}

export const updateAvailability = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado '
        })
    }
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({
        status: 201,
        data: product
    }).status(201)
}


export const deleteProduct = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado '
        })
    }

    await product.destroy()
    res.json({ statusMsg: "Success", message: "Producto Eliminado"})
    
}
