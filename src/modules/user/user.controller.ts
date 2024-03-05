import { Controller, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import UserService from './user.service';
import { Request, Response, NextFunction } from 'express';

@Controller('user')
export class UserController {
  static instance: null | UserController;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor(private userService = UserService) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserController();
    }
    return this.instance;
  }

  // Route: POST: /v1/user/create
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createUserDto: CreateUserDto = req.body;
      const response = await this.userService.create(createUserDto);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/user/me
  public getLoggedinUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user }: any = req;
      const response = await this.userService.getLoggedinUserDetails(user._id);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: DELETE: /v1/user/me
  public deleteLoggedinUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user }: any = req;
      const response = await this.userService.deleteLoggedinUserDetails(user._id);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: PUT: /v1/user/:id
  public updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await this.userService.updateById(id, data);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/user/all
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.userService.find({});
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: GET: /v1/user/:id
  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.userService.findById(id);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };

  // Route: DELETE: /v1/user/:id
  public deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.userService.deleteById(id);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error in logging:', error);
      return next(error);
    }
  };
}

export default UserController.getInstance();
