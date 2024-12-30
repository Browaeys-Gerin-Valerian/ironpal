import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './routers';
import cookieParser from 'cookie-parser';
import { setupSwagger } from "../swagger"
import { errorsCollector, notFound } from './middleware/handlers/errorHandlers';
import { config } from "./config/config"
const { port, base_url, allowed_origin } = config


const app = express();


app.use(cors({
  origin: allowed_origin,
  credentials: true,
}));

app.use(cookieParser())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);
setupSwagger(app);

// Error handling
app.use(notFound);
app.use(errorsCollector);

app.listen(port, () => {
  console.log(`Listening on ${base_url}:${port}`);
});
