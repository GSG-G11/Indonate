import { join } from 'path';
import express, { Request, Response, Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import route from './routes/index';
import { pageNotFoundError, serverError } from './middlewares';

require('env2')('.env');

const app:Application = express();
const { NODE_ENV } = process.env;

app.set('port', process.env.PORT || 5001);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(morgan('tiny'));
app.use('/api', route);

if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.get('*', (req:Request, res:Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(pageNotFoundError);
app.use(serverError);

export default app;
