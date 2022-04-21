import { join } from 'path';
import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import route from './routes/index';

require('env2')('.env');

const app:express.Application = express();
app.set('port', process.env.PORT || 5001);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(morgan('tiny'));
app.use('/api', route);
const { NODE_ENV } = process.env;
if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.get('*', (req:Request, res:Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}
export default app;
