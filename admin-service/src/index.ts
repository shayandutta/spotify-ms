import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { sql } from "./utils/db";
import routes from "./routes";
import { ServerConfig } from "./config";

const app: Express = express();

async function initDB(){
  try{
    await sql `
    CREATE TABLE IF NOT EXISTS albums(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      thumbnail VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

    await sql `
    CREATE TABLE IF NOT EXISTS songs(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      thumbnail VARCHAR(255),
      audio VARCHAR(255) NOT NULL,
      album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

    console.log("Database initialised successfully")
  }catch(error:any){
    console.log("error initDB", error);
  }
}

// Load Swagger document
// const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", routes);

const PORT = ServerConfig.PORT || 3001;

initDB().then(()=>{
  app.listen(Number(PORT), ()=>{
    console.log(`Server is running on port ${PORT}`);
  })
})

