import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "../controllers/product";
import { body, param } from 'express-validator'
import { handleInputErrors } from "../middleware";

const router: Router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 * 
 */

/**
 * @swagger
 * /api/json/v1/products:
 *      get:
 *          summary: Get a list of product
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                      description: Sussessful response
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 * 
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/json/v1/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Sussessful response
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 * 
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid ID
 */

router.get('/:id', param('id').isInt().withMessage('ID no válido'), handleInputErrors, getProductsById)

/**
 * @swagger
 * /api/json/v1/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 'Monitor Curvo'
 *                          price:
 *                              type: number
 *                              example: 300
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 * 
 */

router.post('/',
    body('name').notEmpty().withMessage('El nombre del Producto no debe ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio del Producto no debe ir vacio')
        .isNumeric().withMessage('Valor no Válido')
        .custom(value => value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct)
    
/**
* @swagger
* /api/json/v1/products/{id}:
*   put:
*       summary: Updates a product with user input
*       tags:
*           - Products
*       description: Returns the updated product
*       parameters:
*         - in: path
*           name: id
*           description: The ID of the product to retrieve
*           required: true
*           shema:
*               type: integer
*       requestBody:
*          required: true
*          content:
*              application/json:
*                  schema:
*                      type: object
*                      properties:
*                          name:
*                              type: string
*                              example: 'Monitor Curvo'
*                          price:
*                              type: number
*                              example: 300
*                          availability:
*                              type: boolean
*                              example: true
*       responses:
*           200:
*               description: Successful response
*               content:
*                   application/json:
*                      schema:
*                          $ref: '#/components/schemas/Product'
*           400:
*               description: Bad Request - Invalid ID or Invalid input data
*           404:
*               description: Product Not Found
*/

router.put('/:id', param('id').isInt().withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre del Producto no debe ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio del Producto no debe ir vacio')
        .isNumeric().withMessage('Valor no Válido')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability').notEmpty().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors, updateProduct)

    /**
 * @swagger
 * /api/json/v1/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags: 
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.patch('/:id', param('id').isInt().withMessage('ID no válido'), handleInputErrors, updateAvailability)

/**
* @swagger
* /api/json/v1/products/{id}:
*  delete:
*      summary: Deletes a product by a given ID
*      tags: 
*          - Products
*      description: Returns a confirmation message
*      parameters:
*        - in: path
*          name: id
*          description: The ID of the product to delete
*          required: true
*          schema:
*              type: integer
*      responses:
*          200:
*              description: Successful response
*              content:
*                  application/json:
*                      schema:
*                           type: object
*                           properties:
*                               statusMsg:
*                                   type: string
*                               message:
*                                   type: string
*          400:
*              description: Bad Request - Invalid ID
*          404:
*              description: Product Not Found
*/

router.delete('/:id', param('id').isInt().withMessage('ID no válido'), handleInputErrors, deleteProduct)


export default router
