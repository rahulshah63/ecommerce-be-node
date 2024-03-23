import { Request, Response, NextFunction } from 'express';
import { Controller, HttpStatus } from '@nestjs/common';
import OrderService from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { IUserDocument } from '../user/user.interface';

@Controller('order')
export class OrderController {
  static instance: null | OrderController;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(private orderService = OrderService) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new OrderController();
    }
    return this.instance;
  }

  // Route: POST: /v1/order/create
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createProductDto: CreateOrderDto = req.body;
      const response = await this.orderService.addOrder(createProductDto, req.user as IUserDocument);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/order/track/:trackingId
  public trackOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trackingId } = req.params;
      const response = await this.orderService.getOrder(trackingId, req.user as IUserDocument);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/order/all
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.orderService.find({});
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/order/:id
  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.orderService.findById(id);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: PUT: /v1/order/:id
  public updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await this.orderService.updateById(id, data);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: DELETE: /v1/order/:id
  public deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.orderService.deleteOne({ _id: id });
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };
}

export default OrderController.getInstance();
