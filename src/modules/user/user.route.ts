import { Router } from 'express';
import UserController from './user.controller';
import { AppConfig } from '@/config';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@/interfaces/routes.interface';
import { CreateUserDto } from './dtos/create-user.dto';

class UserRoute implements Routes {
  public path = `/${AppConfig.versioning}/user`;
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, [validationMiddleware(CreateUserDto, 'body')], UserController.create);
    this.router.get(`${this.path}/info`, UserController.getLoggedinUserDetails);
    this.router.post(`${this.path}/delete`, UserController.deleteLoggedinUserDetails);
    this.router.put(`${this.path}/update/:id`, UserController.updateById);
    this.router.get(`${this.path}/:id`, UserController.findById);
    this.router.post(`${this.path}/delete/:id`, UserController.deleteById);
  }
}

export default UserRoute;
