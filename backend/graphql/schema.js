const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolvers');

const typeDefs = `
  type Departamento {
    _id: ID
    nombre: String
    slogan: String
    empleados: [Empleado]
  }

  type Gerente {
    _id: ID
    nombre: String
    email: String
  }

  type Empleado {
    _id: ID
    nombre: String!
    cargo: String
    departamento: String
    sueldo: Float
    createdAt: String
    updatedAt: String
  }

  input EmpleadoInput {
    nombre: String!
    cargo: String
    departamento: String
    sueldo: Float
  }

  input DepartamentoInput {
    nombre: String!
    slogan: String
  }

  type Query {
    saludar(name: String!): String
    empleados: [Empleado]
    departamentos: [Departamento]
    empleado(id: ID!): Empleado
    departamento(nombre: String): String
  }

  type Mutation {
    createEmpleado(input: EmpleadoInput): Empleado
    updateEmpleado(id: ID!, input: EmpleadoInput): Empleado
    deleteEmpleado(id: ID!): Boolean
    createDepartamento(input: DepartamentoInput): Departamento
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
