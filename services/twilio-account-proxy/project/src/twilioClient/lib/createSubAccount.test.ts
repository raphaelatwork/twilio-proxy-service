// createSubAccount.test.ts
import RequestClient from 'twilio/lib/base/RequestClient';
import PrismClient from '../prismClient';
import createSubAccount from './createSubAccount';

const RequestClientClass: typeof RequestClient = RequestClient;
const RequestClientInstance = new RequestClientClass();
describe('library / test createSubAccount', () => {
  it('should return a new subAccount', async () => {
    expect.hasAssertions();
    const newSubAccount = await createSubAccount(
        'dummyFriendlyName',
        'ACbC8dB063DcfAe78a6D0cfEb09e0c7c7a',
        new PrismClient('http://127.0.0.1:4010', RequestClientInstance),
        'dummyApiKey',
        'dummyApiSecret');
    expect(newSubAccount).toBeDefined();
    expect.objectContaining({
      authToken: expect.any(String),
      dateCreated: expect.any(String),
      friendlyName: expect.any(String),
      sid: expect.any(String),
    });
  });
});
