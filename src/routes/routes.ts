import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "../controllers/product";
import { body, param } from 'express-validator'
import { handleInputErrors } from "../middleware";

const router: Router = Router()

router.get('/', getProducts)

router.get('/:id', param('id').isInt().withMessage('ID no válido'), handleInputErrors, getProductsById)

router.post('/',
    body('name').notEmpty().withMessage('El nombre del Producto no debe ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio del Producto no debe ir vacio')
        .isNumeric().withMessage('Valor no Válido')
        .custom(value => value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct)

router.put('/:id', param('id').isInt().withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre del Producto no debe ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio del Producto no debe ir vacio')
        .isNumeric().withMessage('Valor no Válido')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability').notEmpty().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors, updateProduct)

router.patch('/:id', param('id').isInt().withMessage('ID no válido'), handleInputErrors, updateAvailability)

router.delete('/:id', param('id').isInt().withMessage('ID no válido'), handleInputErrors, deleteProduct)


export default router
