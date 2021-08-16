// config.js
import {TProxyConfigOptions} from './types';

import dotenv from 'dotenv';

dotenv.config();

export const ConfigOptions: TProxyConfigOptions = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || '',
  accountAuthToken: process.env.TWILIO_ACCOUNT_AUTH_TOKEN || '',
  endpointUrl: process.env.ENDPOINT_URL || '',
};
