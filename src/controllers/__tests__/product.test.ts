import request from 'supertest'
import server from '../../server'

describe('POST /api/json/v1/products', () => {

    test('should display validation error', async () => {
        const response = await request(server).post('/api/json/v1/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.error).not.toHaveLength(2)
    })

    test('should create a new product', async () => {
        const response = await request(server).post('/api/json/v1/products').send({
            name: "Monitor Curvo 34 Pulgadas",
            price: 300
        })
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error')


    })

    test('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/json/v1/products').send({
            name: "Monitor Curvo",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(1)
        expect(response.body.error.msg).not.toBe('Precio no válido')

        expect(response.status).not.toBe(404)
        expect(response.body.error).not.toHaveLength(2)
    })

    test('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/json/v1/products').send({
            name: "Monitor Curvo",
            price: "Hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.error).not.toHaveLength(4)
    })
})

describe('GET /api/json/v1/products', () => {

    it('Should check if /api/json/v1/products url exists', async () => {
        const response = await request(server).get('/api/json/v1/products')
        expect(response.status).toBe(200)

    })

    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/json/v1/products')

        expect(response.status).toBe(200)
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')

    })
})

describe('GET /api/json/v1/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/json/v1/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado ')
    })

    it('should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/json/v1/products/not-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(1)
        expect(response.body.error[0].msg).toBe('ID no válido')
    })

    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/json/v1/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/json/v1/products/:id', () => {
    it('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/json/v1/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBeTruthy()
        expect(response.body).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should validate that the price is greater then 0', async () => {
        const response = await request(server).put('/api/json/v1/products/1').send({
            name: "Monitor Curvo 34 Pulgadas",
            price: 0,
            availability: true
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBeTruthy()
        expect(response.body.error).toHaveLength(1)
        expect(response.body.error[0].msg).toBe('Precio no válido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should return a 404 response for a not-existent product', async () => {
        const productId = 2000
        const response = await request(server).put(`/api/json/v1/products/${productId}`).send({
            name: "Monitor Curvo",
            price: 500,
            availability: true
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado ')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should update an existing product with valid data', async () => {
        const productId = 1
        const response = await request(server).put(`/api/json/v1/products/${productId}`).send({
            name: "Monitor Curvo",
            price: 500,
            availability: true
        })

        expect(response.status).toBe(200)
        expect(response.body).not.toHaveProperty('data')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error')

    })
})

describe('DELETE /api/json/v1/products/:id', () => {
    test('should check a valid ID', async () => {
        const response = await request(server).delete('/api/json/v1/products/not-valid')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error[0].msg).toBe('ID no válido')
    })

    test('should delete a product', async () => {
        const response = await request(server).delete('/api/json/v1/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto Eliminado')

        expect(response.status).not.toBe(404)
    })
})