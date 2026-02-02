import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { connectDB } from "./utils/db";
import routes from "./routes";
import { ServerConfig } from "./config";

const app: Express = express();

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", routes);

const PORT = ServerConfig.PORT || 3001;

app.listen(Number(PORT), () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});