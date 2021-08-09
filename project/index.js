/* eslint-disable require-jsdoc */
// import PrismClient from './prismClient2';
import twilio from 'twilio';
import RequestClient from 'twilio/lib/base/RequestClient.js';

class PrismClient {
  constructor(prismUrl, requestClient) {
    this.prismUrl = prismUrl;
    this.requestClient = requestClient;
  }

  request(opts) {
    opts.uri = opts.uri.replace(/^https\:\/\/.*?\.twilio\.com/, this.prismUrl);
    return this.requestClient.request(opts);
  }
}

export default PrismClient;


const apiKey = 'dummyApiKey';
const apiSecret = 'dummyApiSecret';
const accountSid = 'ACdummyAccountSid';
const to = '1111111111';
const from = '9999999999';

const client = twilio(apiKey, apiSecret, {
  accountSid,
  httpClient: new PrismClient('http://127.0.0.1:4010', new RequestClient()),
});

client.messages
    .create({to, from, body: 'Ahoy!'})
    .then((message) => console.log(`Message ${message.sid} sent!`))
    .catch((error) => console.error(error));
