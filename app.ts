import express, { Request, Response } from 'express';
import openPositionsController from './controllers/openPositionsController';

const app = express();
const port = 3001;

app.use(express.json());

app.use('/open-positions', openPositionsController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
