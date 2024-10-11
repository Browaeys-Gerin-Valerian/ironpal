import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Route principale "/"
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});