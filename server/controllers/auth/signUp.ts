/* eslint-disable camelcase */
import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { signUpSchema, CustomedError } from '../../utils';
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

    const checkEmail = await Donor.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      throw new CustomedError(
        'Email is used try another one',
        400,
      );
    }
    const hashedPassword = await hash(password, 10);

    const donor: any = await Donor.create({
      name, email, password: hashedPassword, phone, address,
    });
    console.log('donor.is_admin', donor.is_admin);

    // eslint-disable-next-line max-len
    await sign({ id: donor.id }, process.env.SECRET as string, (error:Error | null, token: string | undefined) => {
      if (error) throw new CustomedError('Hash Function Error', 400);

      res.status(201).cookie('ACCESS_TOKEN', token, {
        maxAge: 900000,
        httpOnly: true,
      }).json({
        message: 'Sign in successfully',
        data: {
          name, email, phone, address, is_admin: donor.is_admin,
        },
      });
    });
  } catch (error: any) {
    if (error.details) next(new CustomedError(error.details[0].message, 400));
    next(error);
  }
};

export default signUp;
