import { Request, Response, NextFunction } from 'express';
import { Controller, HttpStatus } from '@nestjs/common';
import ProductService from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('product')
export class ProductController {
  static instance: null | ProductController;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(private productService = ProductService) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductController();
    }
    return this.instance;
  }

  // Route: POST: /v1/product/create
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createProductDto: CreateProductDto = req.body;
      const response = await this.productService.create(createProductDto);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/user/all
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.productService.find({});
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/product/:id
  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.productService.findById(id);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: PUT: /v1/product/:id
  public updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await this.productService.updateById(id, data);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: DELETE: /v1/product/:id
  public deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.productService.deleteOne({ _id: id });
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };
}

export default ProductController.getInstance();
