import { Schema, model } from "mongoose";

const empleadoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    sueldo: { type: Number, required: false }
  },
  { timestamps: true }
);

export default model("Empleado", empleadoSchema);
