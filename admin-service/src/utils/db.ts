import {neon} from "@neondatabase/serverless"
import { ServerConfig } from "../config"


export const sql = neon(ServerConfig.DB_URL as string);