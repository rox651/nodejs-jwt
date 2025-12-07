import { Request, Response } from 'express';
import { SimulationService, ClientInput } from '../services/simulation.service';

export const runSimulation = async (req: Request, res: Response) => {
  try {
    const { clients } = req.body as { clients: ClientInput[] };

    if (!clients || !Array.isArray(clients)) {
      return res.status(400).json({ message: 'Invalid clients data' });
    }

    const result = await SimulationService.run(clients);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during simulation' });
  }
};
