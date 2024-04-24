import express, {Express} from 'express'

const server: Express = express()

server.get('/', (req, res) => {
    res.send('Hola Mundo en Express')
})

export default server