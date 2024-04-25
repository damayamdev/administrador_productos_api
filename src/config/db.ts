import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.URL_DATABASE, {
    models:[__dirname + '/../models/**/*.ts'],
    logging: false
})

export default db