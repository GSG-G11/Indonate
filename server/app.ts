import express from 'express';
import { join } from 'path';
import compression from 'compression';
import cors from 'cors';
import route from './routes';

require('env2')('.env');

const app:express.Application = express();
app.set('port', process.env.PORT || 5001);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use('/api', route);
const { NODE_ENV } = process.env;
if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}
export default app;
