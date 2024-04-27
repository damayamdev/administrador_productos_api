import swaggerJSDoc from 'swagger-jsdoc'
import {SwaggerUiOptions} from 'swagger-ui-express'

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        tags:[
            {
                name:'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title:'REST API Node.js / Express / TypeScript',
            version: '1.0',
            description: 'API Docs for Products'

        }
    },
    apis:[
        './src/routes/routes.ts'
    ]
}


const swaggerSpec = swaggerJSDoc(options)
const swaggerUIOptions : SwaggerUiOptions = {
    customCss: `
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / Typescript'
}

export default swaggerSpec
export {
    swaggerUIOptions
}