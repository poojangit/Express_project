import dotenv from 'dotenv';
//This will import .env packages and loads all the environment variables from .env file
dotenv.config();


import express from 'express';
//importing this framework to build web apli
import cors from 'cors';
//its a middleware for resorce sharing
import helmet from 'helmet';
//importing this to  provide security for http headers

import routes from './routes';
//custom module containing application route
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

import morgan from 'morgan';

const app = express();
//initializes an express apli


//these are the configuration variables from .env 
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

//
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));

app.use(`/api/${api_version}`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});

export default app;
