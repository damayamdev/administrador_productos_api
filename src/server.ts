import express, {Express} from 'express'
import router from './routes/routes'
import db from './config/db'
import colors from 'colors'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue('Conexión exitosa a la BD'))
    } catch (error) {
        console.log(error)
        console.log(colors.red('Hubo un error al conectar a la BD'))
    }
}

connectDB()

const server: express.Application = express()

server.use(express.json())

server.use('/api/json/v1/products', router)

export default server