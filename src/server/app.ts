// app.ts
import express, {Request, Response} from 'express';
import logger from 'morgan';
import RequestClient from 'twilio/lib/base/RequestClient.js';
import createSubaccount from '../twilioClient/lib/createSubaccount';
import RequestClientWrapper from '../twilioClient/requestClientWrapper';
import {ConfigOptions} from './config';
import * as OpenApiValidator from 'express-openapi-validator';
import getSubaccounts from '../twilioClient/lib/getSubaccounts';
import ISubaccount from '../contracts/types/ISubaccount';
import ICreateSubaccount from '../contracts/types/ICreateSubaccount';

const app = express();

// #region body parsers
app.use(logger('dev'));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: false}));
// #endregion

// #region middleware
/**
 * NOTE: Setting "validateResponses: true" below will cause one of our local tests running
 * against the Twilio Prism mock server to fail because the mock server doesn't return
 * properly formatted date-time strings for the "dateCreated" property of account instances and
 * this breaches the OpenAPI contract that says the "dateCreated" property of an account
 * instance must be formatted as a date-time string.
 */
app.use(
    OpenApiValidator.middleware({
      apiSpec: './dist/openapi.json',
      validateRequests: true,
      validateResponses: false,
    }),
);
// #endregion

// #region endpoints
const RequestClientClass: typeof RequestClient = RequestClient;
const requestClient = new RequestClientWrapper(ConfigOptions.endpointUrl, new RequestClientClass());
app.post('/account/:accountSid/subaccounts/createSubaccount.json',
    async (req, res, next) => {
      const createAccountParams: ICreateSubaccount = req.body;
      const {friendlyName, accountSid} = createAccountParams;
      // const accountSid: string = req.body.accountSid;
      // const friendlyName: string = req.body.friendlyName;
      const subaccount = await createSubaccount(
          friendlyName,
          accountSid,
          requestClient,
          'AC12349781234981723948123749812739', // must start with AC
          'DummyAPISecret',
      );
      return res.status(201).json(subaccount);
    });

app.get('/account/:accountSid/subaccounts.json',
    async (req, res, next) => {
      const accountSid: string = req.params.accountSid;
      const twilioSubaccounts = await getSubaccounts(
          accountSid,
          requestClient,
          'AC12349781234981723948123749812739', // must start with AC
          'DummyAPISecret',
      );
      // TODO: replace href string with function that returns string below
      const subaccounts = twilioSubaccounts.map((s) => {
        const subaccount: ISubaccount = {
          sid: s.sid,
          href: `/account/${accountSid}/subaccount/${s.sid}`,
          parentAccountSid: accountSid,
          friendlyName: s.friendlyName,
          dateCreated: s.dateCreated.toDateString(),
        };
        return subaccount;
      });
      return res.status(200).json(subaccounts);
    },
);
// #endregion

// #region error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  if (ConfigOptions.envName !== 'LOCAL' && ConfigOptions.envName !== 'TEST') {
    console.error(err); // dump error to console for debug
  }
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
// #endregion


export default app;
