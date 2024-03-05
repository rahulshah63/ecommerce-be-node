import httpStatus from 'http-status';

import { isEmpty } from '@/utils/util';
import UserModel from "@/modules/user/user.modal";
import { HttpException } from "@/exceptions/HttpException";
// import { CLIENT_ID } from '@/config';

export const addUser = async (userId: string, email: string, password: string, name: string, provider: string) => {
  const hasMissingData = [email, password, name].some(_value => isEmpty(_value));

  if (hasMissingData) throw new HttpException(httpStatus.BAD_REQUEST, 'user data is empty');
  const user = await UserModel.findOne({ email });
  if (user) throw new HttpException(httpStatus.CONFLICT, `user with email ${email} already exist`);

  return await UserModel.create({ userId, email, password, name, provider });
};

export const validateUser = async (userId: string, clientId: string, expiry: number) => {
  if (isEmpty(userId) || isEmpty(clientId)) throw new HttpException(httpStatus.UNPROCESSABLE_ENTITY, 'failed to validate');
  if (clientId !== process.env.CLIENT_ID) throw new HttpException(httpStatus.UNAUTHORIZED, 'Unauthorized Client Id');
  if (expiry < Date.now() / 1000) throw new HttpException(httpStatus.UNAUTHORIZED, 'Jwt expired');
  const user = await UserModel.findOne({ userId });
  if (isEmpty(user)) throw new HttpException(httpStatus.CONFLICT, `user not found`);

  return {
    isAuthorized: true,
    data: user,
  };
};
