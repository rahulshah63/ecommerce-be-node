import { Router } from 'express';
import ProductController from './product.controller';
import { AppConfig } from '@/config';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@/interfaces/routes.interface';
import { CreateProductDto } from './dtos/create-product.dto';
import { adminOnly, producerOnly } from '@/middlewares/access.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class ProductRoute implements Routes {
  public path = `/${AppConfig.versioning}/product`;
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      [validationMiddleware(CreateProductDto, 'body'), authMiddleware, producerOnly()],
      ProductController.create,
    );
    this.router.get(`${this.path}/all`, ProductController.findAll);
    this.router
      .route(`${this.path}/:id`)
      .get(ProductController.findById)
      .put([authMiddleware, producerOnly()], ProductController.updateById)
      .delete([authMiddleware, adminOnly()], ProductController.deleteById);
  }
}

export default ProductRoute;
