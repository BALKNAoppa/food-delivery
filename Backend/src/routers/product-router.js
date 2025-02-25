import express from 'express';
import { getProduct } from '../src/product/get-product.js';

export const productRouter = express.Router();

productRouter.get('/', getProduct)