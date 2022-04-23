import { NextFunction, Request, Response } from 'express';
// import { compare } from 'bcryptjs';
// import { loginSchema, CustomedError, signToken } from '../../utils';
// import { Donor } from '../../database/models';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  // const {
  //   name, email, password, phone, address,
  // } = req.body;
  console.log(req.body);

  // try {
  //   await loginSchema.validateAsync({ email, password });

  //   const user = await Donor.findOne({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (!user) {
  //     throw new CustomedError(
  //       "Email doesn't exists, Try another one or sign up",
  //       400,
  //     );
  //   }

  //   const isPasswordValidate = await compare(
  //     password,
  //     user?.getDataValue('password'),
  //   );
  //   if (!isPasswordValidate) {
  //     throw new CustomedError('Incorrect password, please try again', 400);
  //   }

  //   const payload = {
  //     id: user?.getDataValue('id'),
  //     name: user?.getDataValue('name'),
  //     isAdmin: user?.getDataValue('is_admin'),
  //   };
  //   const token = await signToken(payload);
  //   if (typeof token !== 'string') {
  //     throw new CustomedError('Unexpected Error', 500);
  //   }
  //   res
  //     .cookie('ACCESS_TOKEN', token, {
  //       maxAge: 900000,
  //       httpOnly: true,
  //     })
  //     .json({ message: 'Successfully logged in', data: payload });
  // } catch (error) {
  //   if (error.details) next(new CustomedError(error.details[0].message, 400));
  //   else next(error);
  // }
};

export default signUp;
