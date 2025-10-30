**Resumen**
- Backend Express + GraphQL con `express-graphql` y Babel.
- Datos simulados de empleados (memoria) y modelo `Departamento` en MongoDB con Mongoose.
- Incluye scripts para desarrollo (`npm start`), build (`npm run build`) y ejecución de build (`npm run serve`).

**Instalación de dependencias**
- Opcional en una sola línea:
  - `npm install express express-graphql graphql @graphql-tools/schema @graphql-tools/utils rimraf mongoose && npm install -D nodemon @babel/core @babel/cli @babel/preset-env @babel/node`
- O paso a paso (como se indicó):
  - `npm install express`
  - `npm install express-graphql`
  - `npm install graphql`
  - `npm install graphql-tools`
  - `npm install @graphql-tools/schema`
  - `npm install @graphql-tools/utils`
  - `npm install nodemon -D`
  - `npm install rimraf`
  - `npm install mongoose`
  - `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node`

**Variables de entorno**
- `MONGODB_URI` (opcional): por defecto se usa `mongodb://127.0.0.1:27017/graphql_empleados`.

**Scripts**
- `npm start`: desarrollo con `nodemon` + `babel-node` sobre `src/`.
- `npm run build`: compila `src/` a `dist/` con sourcemaps.
- `npm run serve`: ejecuta `node dist/index.js` (requiere build previo).
- `npm run clean`: limpia `dist/`.

**Estructura**
- `src/index.js`: servidor Express y endpoint `/graphql`.
- `src/schema.js`: typeDefs + schema GraphQL.
- `src/resolvers.js`: resolvers de Query y Mutation.
- `src/sample.js`: datos simulados de empleados.
- `src/models/Departamento.js`: modelo Mongoose para Departamento.
- `src/db.js`: conexión a MongoDB.

**Uso**
1) Arranca tu MongoDB local (o define `MONGODB_URI`).
2) Instala las dependencias (ver arriba).
3) Ejecuta `npm start`.
4) Abre `http://localhost:3000/graphql` para GraphiQL.

**Ejemplos**
- Query:
```
{
  empleados {
    nombre
    sueldo
  }
}
```
- Consultar departamentos (MongoDB):
```
{
  departamentos {
    _id
    nombre
    slogan
    createdAt
  }
}
```
- Buscar departamento por id:
```
{
  departamentoById(id: "<ID_AQUI>") {
    _id
    nombre
    slogan
  }
}
```
- Mutation (memoria):
```
mutation {
  createEmpleado(input: { nombre: "Carlos Ruiz", sueldo: 1200 }) {
    _id
    nombre
  }
}
```
- Mutation (MongoDB):
```
mutation {
  createDepartamento(input: { nombre: "Ventas", slogan: "Cerramos con clase" }) {
    _id
    nombre
    slogan
    createdAt
  }
}
```

**Notas**
- Coloqué el modelo en `src/models/Departamento.js` para que Babel lo incluya en el build. Así `npm run serve` funciona sin romper imports.
- Si prefieres `models/` fuera de `src/`, adapta `build` para compilar también `models/` y ajusta rutas de import en `dist/`.
