import server from "./server";
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT_SERVER || 4000
server.listen(PORT, () => {
    console.log(colors.blue(`REST API en el puerto ${PORT}`))
})