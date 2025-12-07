import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/productController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.post('/', authorize(['admin']), createProduct);

router.get('/', getProducts);

export default router;

