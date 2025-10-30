import mongoose from "mongoose";

export async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/graphql_empleados";
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, { autoIndex: true });
  console.log("✅ MongoDB conectado", mongoUri);
}

// Backwards compatible: if module is imported directly and a URI is present, connect automatically
if (process.env.MONGODB_URI) {
  connectDB(process.env.MONGODB_URI).catch((err) =>
    console.error("Error al conectar a MongoDB:", err.message)
  );
}

