import express, { Request, Response } from 'express';
import openPositionsService from '../service/openPositionsService';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const department = req.query.department as string;

  if (!department) {
    return res.status(400).send('Department is required!');
  }

  try {
    const titles = await openPositionsService.getOpenPositions(department);

    if (titles.length === 0) {
      return res.status(404).send('No department found!');
    }

    return res.status(200).json(titles);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('Internal Server Error');
  }
});

export default router;
