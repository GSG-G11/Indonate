/* eslint-disable camelcase */
import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { Op } from 'sequelize';
import { signUpSchema, CustomedError, signToken } from '../../utils';
import { Donor } from '../../database/models';

require('env2')('.env');

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = await signUpSchema.validateAsync(req.body);
    const {
      name,
      email,
      password,
      phone,
      address,
    } = validationResult;

    const check: any = await Donor.findOne({
      where: {
        [Op.or]: [
          { email },
          { phone },
        ],
      },
    });

    if (check) {
      if (check.email === email) {
        throw new CustomedError(
          'Email is used try another one',
          400,
        );
      } else {
        throw new CustomedError(
          'phone is used try another one',
          400,
        );
      }
    }

    const hashedPassword = await hash(password, 10);

    const donor: any = await Donor.create({
      name, email, password: hashedPassword, phone, address,
    });

    const payload = {
      id: donor?.getDataValue('id'),
      name: donor?.getDataValue('name'),
      isAdmin: donor?.getDataValue('is_admin'),
    };

    const token = await signToken(payload);

    res.status(201).cookie('ACCESS_TOKEN', token, {
      maxAge: 900000,
      httpOnly: true,
    }).json({
      message: 'Sign up successfully',
      data: {
        id: donor.id, name, is_admin: donor.is_admin,
      },
    });
  } catch (error: any) {
    if (error.details) next(new CustomedError(error.details[0].message, 400));
    next(error);
  }
};

export default signUp;
