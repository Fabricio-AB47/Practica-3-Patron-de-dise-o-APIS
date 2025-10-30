import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers.js";

const typeDefs = /* GraphQL */ `
  type Empleado {
    _id: ID
    nombre: String!
    sueldo: Float
  }

  type Departamento {
    _id: ID
    nombre: String!
    slogan: String
    empleados: [Empleado]
  }

  type Query {
    saludar(name: String!): String
    empleados: [Empleado!]
    departamentoPorNombre(nombre: String!): Departamento
    departamentos: [Departamento!]
  }

  input EmpleadoInput {
    nombre: String!
    sueldo: Float
  }

  input DepartamentoInput {
    nombre: String!
    slogan: String
    empleadosIds: [ID!]
  }

  type Mutation {
    createEmpleado(input: EmpleadoInput!): Empleado!
    createDepartamento(input: DepartamentoInput!): Departamento!
    addEmpleadoToDepartamento(depNombre: String!, empleadoId: ID!): Departamento!
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
