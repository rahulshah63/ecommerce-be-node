import { Request, Response, NextFunction } from 'express';
import { Controller, HttpStatus } from '@nestjs/common';
import CategoryService from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {
  static instance: null | CategoryController;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(private categoryService = CategoryService) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new CategoryController();
    }
    return this.instance;
  }

  // Route: POST: /v1/category/create
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createProductDto: CreateCategoryDto = req.body;
      const response = await this.categoryService.create({
        ...createProductDto,
        image: 'N/A',
      });
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/category/all
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.categoryService.find({});
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/category/:id
  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.categoryService.findById(id);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: PUT: /v1/category/:id
  public updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await this.categoryService.updateById(id, data);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: DELETE: /v1/category/:id
  public deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.categoryService.deleteOne({ _id: id });
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };
}

export default CategoryController.getInstance();
