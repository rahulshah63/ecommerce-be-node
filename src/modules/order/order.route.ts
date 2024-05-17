import { Router } from 'express';
import OrderController from './order.controller';
import { AppConfig } from '@/config';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@/interfaces/routes.interface';
import { CreateOrderDto } from './dtos/create-order.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import { adminOnly, producerOnly } from '@/middlewares/access.middleware';

class OrderRoute implements Routes {
  public path = `/${AppConfig.versioning}/order`;
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, [validationMiddleware(CreateOrderDto, 'body'), authMiddleware], OrderController.create);
    this.router.get(`${this.path}/all`, [authMiddleware, adminOnly()], OrderController.findAll);
    this.router.get(`${this.path}/track/:trackingId`, [authMiddleware], OrderController.trackOrder);
    this.router.get(`${this.path}/track/user`, [authMiddleware], OrderController.trackOrderByUserId);
    this.router
      .route(`${this.path}/:id`)
      .get([authMiddleware, producerOnly()], OrderController.findById)
      .put([authMiddleware, adminOnly()], OrderController.updateById)
      .delete([authMiddleware, adminOnly()], OrderController.deleteById);
  }
}

export default OrderRoute;
