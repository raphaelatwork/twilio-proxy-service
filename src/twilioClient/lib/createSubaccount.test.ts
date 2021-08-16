// createSubaccount.test.ts
import RequestClient from 'twilio/lib/base/RequestClient';
import {AccountInstance} from 'twilio/lib/rest/api/v2010/account';
import {ConfigOptions} from '../../server/config';
import RequestClientWrapper from '../requestClientWrapper';
import createSubaccount from './createSubaccount';

const RequestClientClass: typeof RequestClient = RequestClient;
const requestClientInstance = new RequestClientWrapper(
    ConfigOptions.endpointUrl,
    new RequestClientClass());
describe('library / test createSubaccount', () => {
  it('should return a new subaccount', async () => {
    expect.hasAssertions();
    const newSubAccount = await createSubaccount(
        'dummyFriendlyName',
        'AC12341234123412341234123412341234',
        requestClientInstance,
        'dummyApiKey',
        'dummyApiSecret');
    expect(newSubAccount).toBeDefined();
    expect(newSubAccount).toBeInstanceOf(AccountInstance);
  });
});
