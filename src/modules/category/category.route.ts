import { Router } from 'express';
import CategoryController from './category.controller';
import { AppConfig } from '@/config';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@/interfaces/routes.interface';
import { CreateCategoryDto } from './dtos/create-category.dto';

class CategoryRoute implements Routes {
  public path = `/${AppConfig.versioning}/category`;
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, [validationMiddleware(CreateCategoryDto, 'body')], CategoryController.create);
    this.router.get(`${this.path}/all`, CategoryController.findAll);
    this.router.get(`${this.path}/:id`, CategoryController.findById);
    this.router.put(`${this.path}/:id`, CategoryController.updateById);
    this.router.delete(`${this.path}/:id`, CategoryController.deleteById);
  }
}

export default CategoryRoute;
