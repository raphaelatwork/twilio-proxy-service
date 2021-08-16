// app.ts
import express, {Request, Response} from 'express';
import logger from 'morgan';
import swaggerValidation from 'openapi-validator-middleware';
import RequestClient from 'twilio/lib/base/RequestClient';
import createSubaccount from '../twilioClient/lib/createSubaccount';
import RequestClientWrapper from '../twilioClient/requestClientWrapper';
import {ConfigOptions} from './config';


swaggerValidation.init('./openapi.json');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const RequestClientClass: typeof RequestClient = RequestClient;
const requestClient = new RequestClientWrapper(ConfigOptions.endpointUrl, new RequestClientClass());

app.post('/account/:accountSid/subAccounts/createSubaccount.json',
    swaggerValidation.validate,
    async (req, res, next) => {
      const accountSid = req.params.accountSid;
      const friendlyName: string = req.body.friendlyName;
      const subaccount = await createSubaccount(friendlyName
          , accountSid
          , requestClient
          , 'DUMMYAPIKEY'
          , 'DUMMYAPISECRET');
      return res.status(201).json(subaccount);
    });


app.use((err: Error, req: Request, res: Response, next: any) => {
  if (err instanceof swaggerValidation.InputValidationError) {
    return res.status(400).json({more_info: JSON.stringify(err.errors)});
  }
});

export default app;
