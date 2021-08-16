// app.ts
import express, {Request, Response} from 'express';
import logger from 'morgan';
import RequestClient from 'twilio/lib/base/RequestClient';
import createSubaccount from '../twilioClient/lib/createSubaccount';
import RequestClientWrapper from '../twilioClient/requestClientWrapper';
import {ConfigOptions} from './config';
import * as OpenApiValidator from 'express-openapi-validator';

const app = express();

// #region body parsers
app.use(logger('dev'));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: false}));
// #endregion

// #region middleware
app.use(
    OpenApiValidator.middleware({
      apiSpec: './dist/openapi.json',
      validateRequests: true,
    }),
);
// #endregion

// #region endpoints
const RequestClientClass: typeof RequestClient = RequestClient;
const requestClient = new RequestClientWrapper(ConfigOptions.endpointUrl, new RequestClientClass());
app.post('/account/:accountSid/subAccounts/createSubaccount.json',
    async (req, res, next) => {
      const accountSid = req.body.accountSid;
      const friendlyName: string = req.body.friendlyName;
      const subaccount = await createSubaccount(
          friendlyName,
          accountSid,
          requestClient,
          'AC12349781234981723948123749812739', // must start with AC
          'DummyAPISecret',
      );
      return res.status(201).json(subaccount);
    });
// #endregion

// #region error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  if (ConfigOptions.envName !== 'TEST') {
    console.error(err); // dump error to console for debug
  }
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
// #endregion


export default app;
