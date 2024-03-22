import { Router } from 'express';
import ProductController from './product.controller';
import { AppConfig } from '@/config';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@/interfaces/routes.interface';
import { CreateProductDto } from './dtos/create-product.dto';

class ProductRoute implements Routes {
  public path = `/${AppConfig.versioning}/product`;
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, [validationMiddleware(CreateProductDto, 'body')], ProductController.create);
    this.router.get(`${this.path}/all`, ProductController.findAll);
    this.router.route(`${this.path}/:id`).get(ProductController.findById).put(ProductController.updateById).delete(ProductController.deleteById);
  }
}

export default ProductRoute;
