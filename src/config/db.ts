import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.URL_DATABASE, {
    models:[__dirname + '/../models/**/*.ts']
})

export default db