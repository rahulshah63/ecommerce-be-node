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
    this.router.get(`${this.path}/me`, UserController.getLoggedinUserDetails);
    this.router.delete(`${this.path}/me`, UserController.deleteLoggedinUserDetails);
    this.router.get(`${this.path}/all`, UserController.findAll);
    this.router.route(`${this.path}/:id`).put(UserController.updateById).get(UserController.findById).delete(UserController.deleteById);
  }
}

export default UserRoute;
