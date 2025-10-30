import mongoose from "mongoose";

const { Schema, model } = mongoose;

const departamentoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    slogan: { type: String },
    empleados: [{ type: Schema.Types.ObjectId, ref: "Empleado" }],
  },
  { timestamps: true }
);

export default model("Departamento", departamentoSchema);

