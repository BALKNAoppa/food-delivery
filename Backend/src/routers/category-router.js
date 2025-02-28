import express from 'express';
import { authorizationMiddleware } from '../middleware/autho.js';
import { createCategory } from '../controller/foodcategory/create-category.js';
export const categoryRouter = express.Router();

categoryRouter.post('/', authorizationMiddleware, createCategory)
