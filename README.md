# administrador_productos_api

## Paso 1:
- se crea el proyecto con npm init
- Se activa el type ("type":"module")

## Paso 2:
Se instala las dependencias de desarrollo
- pnpm i -D typescript ts-node nodemon

## Paso 3: 
se configura el archivo tsconfig.json
```
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "lib": ["esnext"],
    "target": "ESNext",
    "moduleResolution": "NodeNext",
    "module": "NodeNext",
    "strict": false,
    "sourceMap": true,
    "esModuleInterop": true,
    "declaration": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
},
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Paso 4:
Se instala express 
- pnpm i express

## Paso 5:
Se instala los types de express, sequelize y la instalcia de la base de datos
- pnpm i -D @types/express
- pnpm install --save sequelize
- pnpm install --save pg pg-hstore
- pnpm i dotenv
- pnpm i sequelize-typescript
- pnpm i express-validator
- pnpm i cors
- pnpm i -D @types/cors

## Paso 6:
Se instalan las herramientas para realizar las pruebas unitarias y las pruebas de integración

- pnpm i -D supertest @types/supertest jest @types/jest ts-jest

- npx ts-jest config:init

## Paso 7:
Se instala las herramientas para crear la documentación de la API

- pnpm i swagger-jsdoc swagger-ui-express
- pnpm i -D @types/swagger-jsdoc @types/swagger-ui-express