import express from 'express';
import { authorizationMiddleware } from '../middleware/autho.js';
import { createCategory } from '../controller/foodcategory/create-category.js';
import { updateCategory } from '../controller/foodCategory/update-category.js';
import { getCategories } from '../controller/foodCategory/get-category.js';
export const categoryRouter = express.Router();

categoryRouter.post('/', authorizationMiddleware, createCategory)
categoryRouter.put('/update', authorizationMiddleware, updateCategory)
categoryRouter.get('/', authorizationMiddleware, getCategories)