import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import loginSchema from '../../utils/loginSchema';
import CustomedError from '../../utils/customedError';
import { Donor } from '../../database/models';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    await loginSchema.validateAsync({ email, password });
  } catch (error) {
    next(new CustomedError(error.details[0].message, 400));
  }
  try {
    const user = await Donor.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new CustomedError(
        "Email doesn't exists, Try another one or sign up",
        406,
      );
    }
    const isPasswordValidate = await bcrypt.compare(
      password,
      user?.getDataValue('password'),
    );
    if (!isPasswordValidate) {
      throw new CustomedError('Incorrect password, please try again', 406);
    }
    const payload = {
      id: user?.getDataValue('id'),
      name: user?.getDataValue('name'),
      isAdmin: user?.getDataValue('is_admin'),
    };
    const token = jwt.sign(payload, process.env.SECRET as string, {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    res
      .status(200)
      .cookie('ACCESS_TOKEN', token, {
        maxAge: 900000,
        httpOnly: true,
      })
      .json({ message: 'Successfully logged in', data: payload });
  } catch (error) {
    next(error);
  }
};

export default login;
