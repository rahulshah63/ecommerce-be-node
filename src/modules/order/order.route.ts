import { Router } from 'express';
import OrderController from './order.controller';
import { AppConfig } from '@/config';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@/interfaces/routes.interface';
import { CreateOrderDto } from './dtos/create-order.dto';

class OrderRoute implements Routes {
  public path = `/${AppConfig.versioning}/order`;
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, [validationMiddleware(CreateOrderDto, 'body')], OrderController.create);
    this.router.get(`${this.path}/all`, OrderController.findAll);
    this.router.route(`${this.path}/:id`).get(OrderController.findById).put(OrderController.updateById).delete(OrderController.deleteById);
  }
}

export default OrderRoute;
