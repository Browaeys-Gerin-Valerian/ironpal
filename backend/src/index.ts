import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routers';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true,
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${BASE_URL}:${PORT}`);
});
