import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Main road "/"
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Server Startup
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});