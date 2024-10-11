import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

app.use(express.json());

// Middleware to parse incoming requests with URL-encoded payloads.
// Setting `extended: true` allows parsing of rich objects and arrays using the querystring library.
app.use(express.urlencoded({ extended: true }));

// Middleware to enable Cross-Origin Resource Sharing (CORS).
// This allows our server to handle requests from different origins, making it accessible from domain frontend.
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${BASE_URL}:${PORT}`);
});
