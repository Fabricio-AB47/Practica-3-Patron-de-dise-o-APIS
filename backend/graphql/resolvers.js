const Empleado = require('../models/Empleado');
const Departamento = require('../models/Departamento');
const sample = require('./sample');

const resolvers = {
  Query: {
    saludar: (_root, { name }) => `Hola ${name}!`,
    empleados: async () => {
      try {
        // prefer DB if available
        const docs = await Empleado.find().lean().exec();
        if (docs && docs.length) return docs;
      } catch (e) {
        // ignore and fallback to sample
        console.warn('[GraphQL] Could not fetch from DB, using sample', e.message);
      }
      return sample.empleados;
    },
    empleado: async (_root, { id }) => {
      try {
        const doc = await Empleado.findById(id).lean().exec();
        if (doc) return doc;
      } catch (e) {
        console.warn('[GraphQL] empleado fetch error', e.message);
      }
      return sample.empleados.find(x => String(x._id) === String(id));
    },
    // list departamentos from DB
    departamentos: async () => {
      try {
        const docs = await Departamento.find().lean().exec();
        return docs;
      } catch (e) {
        console.warn('[GraphQL] Could not fetch departamentos from DB', e.message);
      }
      return [];
    },
    departamento: (_root, { nombre }) => `${nombre}!`
  },
  Mutation: {
    createEmpleado: async (_root, { input }) => {
      try {
        const doc = await new Empleado(input).save();
        return doc.toObject({ versionKey: false });
      } catch (e) {
        console.error('[GraphQL] createEmpleado error', e.message);
        // fallback to sample (non-persistent)
        input._id = sample.empleados.length + 1;
        sample.empleados.push(input);
        return input;
      }
    },
    createDepartamento: async (_root, { input }) => {
      try {
        const doc = await new Departamento(input).save();
        return doc.toObject({ versionKey: false });
      } catch (e) {
        console.error('[GraphQL] createDepartamento error', e.message);
        // fallback: return the input with a temporary id
        input._id = Date.now();
        return input;
      }
    },
    updateEmpleado: async (_root, { id, input }) => {
      try {
        const updated = await Empleado.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true }).lean().exec();
        if (updated) return updated;
      } catch (e) {
        console.error('[GraphQL] updateEmpleado error', e.message);
      }
      const idx = sample.empleados.findIndex(x => String(x._id) === String(id));
      if (idx >= 0) {
        sample.empleados[idx] = { ...sample.empleados[idx], ...input };
        return sample.empleados[idx];
      }
      return null;
    },
    deleteEmpleado: async (_root, { id }) => {
      try {
        const res = await Empleado.findByIdAndDelete(id).exec();
        return !!res;
      } catch (e) {
        console.error('[GraphQL] deleteEmpleado error', e.message);
      }
      const idx = sample.empleados.findIndex(x => String(x._id) === String(id));
      if (idx >= 0) {
        sample.empleados.splice(idx, 1);
        return true;
      }
      return false;
    }
  }
};

module.exports = resolvers;
