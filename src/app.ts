import express, { Request, Response } from 'express';
import cors from 'cors';
import routesV1 from './api/v1/routes';
const app = express();
const API_PREFIX = '/api';

app.use(cors());
app.use(express.json());

app.get('/api', (req: Request, res: Response): Response => {
  return res.status(200).send({ message: 'Welcome to amalitech challenge' });
});

app.use(`${API_PREFIX}/v1`, routesV1);

app.use((_req: Request, res: Response): Response => {
  return res.status(404).send({ message: 'Route not found' });
});

export default app;
