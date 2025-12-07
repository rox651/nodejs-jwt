import { Request, Response } from 'express';
import { ProductRepository } from '../repositories/product.repository';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const newProduct = await ProductRepository.create({ name, price });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await ProductRepository.findAll();
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
