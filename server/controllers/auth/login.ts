import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import loginSchema from '../../utils/loginSchema';
import CustomedError from '../../utils/customedError';
import { Donor } from '../../database/models';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    await loginSchema.validateAsync({ email, password });
  } catch (error) {
    next(new CustomedError(error.details[0].message, 200));
  }
  const user = await Donor.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    next(
      new CustomedError("Email doesn't exists, Try another one or sign up", 406),
    );
  }
  const isPasswordValidate = await bcrypt.compare(
    password,
    user?.getDataValue('password'),
  );
  if (!isPasswordValidate) {
    next(new CustomedError('Incorrect password, please try again ', 406));
  }
};

export default login;
