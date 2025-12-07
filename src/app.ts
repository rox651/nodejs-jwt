import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import simulationRoutes from './routes/simulationRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/simulation', simulationRoutes);

app.get('/', (req, res) => {
  res.send('Supermarket Simulation API');
});

export default app;

