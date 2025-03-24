import express from 'express';
import { authorizationMiddleware } from '../middleware/autho.js';
import { updateCategory } from '../controller/foodCategory/update-category.js';
import { getCategories } from '../controller/foodCategory/get-category.js';
import { createCategory } from '../controller/foodCategory/create-category.js';

export const categoryRouter = express.Router();

categoryRouter.post('/', authorizationMiddleware, createCategory)
categoryRouter.put('/update', authorizationMiddleware, updateCategory)
categoryRouter.get('/', getCategories)