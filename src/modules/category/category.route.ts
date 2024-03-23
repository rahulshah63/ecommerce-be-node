import { Router } from 'express';
import CategoryController from './category.controller';
import { AppConfig } from '@/config';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@/interfaces/routes.interface';
import { CreateCategoryDto } from './dtos/create-category.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import { adminOnly, producerOnly } from '@/middlewares/access.middleware';

class CategoryRoute implements Routes {
  public path = `/${AppConfig.versioning}/category`;
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      [validationMiddleware(CreateCategoryDto, 'body'), authMiddleware, producerOnly()],
      CategoryController.create,
    );
    this.router.get(`${this.path}/all`, CategoryController.findAll);
    this.router
      .route(`${this.path}/:id`)
      .get(CategoryController.findById)
      .put([authMiddleware, producerOnly()], CategoryController.updateById)
      .delete([authMiddleware, adminOnly()], CategoryController.deleteById);
  }
}

export default CategoryRoute;
