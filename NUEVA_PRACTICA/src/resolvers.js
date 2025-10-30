import Empleado from "./models/Empleado.js";
import Departamento from "./models/Departamento.js";
import { empleadosSample } from "./sample.js";

export const resolvers = {
  Query: {
    saludar: (_, { name }) => `Hola ${name}!`,
    empleados: async () => {
      const count = await Empleado.estimatedDocumentCount();
      if (count === 0) {
        return empleadosSample.map((e) => ({
          _id: e._id,
          nombre: e.nombre,
          sueldo: e.sueldo,
        }));
      }
      return await Empleado.find();
    },
    departamentoPorNombre: async (_, { nombre }) => {
      return await Departamento.findOne({ nombre }).populate("empleados");
    },
    departamentos: async () => {
      return await Departamento.find().populate("empleados");
    },
  },

  Mutation: {
    createEmpleado: async (_, { input }) => {
      const nuevo = new Empleado(input);
      await nuevo.save();
      return nuevo;
    },
    createDepartamento: async (_, { input }) => {
      const { nombre, slogan, empleadosIds } = input;
      const dep = new Departamento({
        nombre,
        slogan,
        empleados: empleadosIds || [],
      });
      await dep.save();
      return await dep.populate("empleados");
    },
    addEmpleadoToDepartamento: async (_, { depNombre, empleadoId }) => {
      const dep = await Departamento.findOne({ nombre: depNombre });
      if (!dep) throw new Error("Departamento no encontrado");
      if (!dep.empleados.find((id) => String(id) === String(empleadoId))) {
        dep.empleados.push(empleadoId);
        await dep.save();
      }
      return await dep.populate("empleados");
    },
  },
};
