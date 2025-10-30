import "dotenv/config";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";
import { connectDB } from "./db.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "GRAPHQL Empleados" });
});

app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    graphiql: true,
    schema,
    context: { requestId: req.headers["x-request-id"] || null },
    customFormatErrorFn: (err) => ({
      message: err.message,
      path: err.path,
      locations: err.locations,
    }),
  }))
);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server corriendo en http://localhost:${PORT}`);
      console.log(`🧪 GraphiQL en       http://localhost:${PORT}/graphql`);
    });
  } catch (e) {
    console.error("❌ Error al iniciar:", e);
    process.exit(1);
  }
})();

export default app;

