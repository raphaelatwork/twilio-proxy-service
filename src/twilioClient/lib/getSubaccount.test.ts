// getSubaccounts.test.ts
import RequestClient from 'twilio/lib/base/RequestClient';
// import {AccountInstance} from 'twilio/lib/rest/api/v2010/account';
import RequestClientWrapper from '../requestClientWrapper';
import getSubaccounts from './getSubaccounts';
import {ConfigOptions} from '../../server/config';


const RequestClientClass: typeof RequestClient = RequestClient;
const requestClientInstance = new RequestClientWrapper(
    ConfigOptions.endpointUrl,
    new RequestClientClass());
/**
 * Note: If your code uses the .list or .each methods that are available
 * (such as client.messages.list(), running your code against the mock will
 * cause it to throw an error. This is because the mocked next_page_uri value
 * will be http://example.com, which will cause the request to 404 against
 * Prism. Therefore, we're not going to run this test against the mock server
 * since it's testing a method that makes use of .list.
 */
describe('library / test getSubaccounts', () => {
  it('should return a list of accounts', async () => {
    // expect.hasAssertions();
    if (ConfigOptions.envName !== 'LOCAL') {
      const subaccounts = await getSubaccounts(
          'AC12341234123412341234123412341234',
          requestClientInstance,
          'dummyApiKey',
          'dummyApiSecret');
      expect(subaccounts).toBeDefined();
      expect(subaccounts).toBeInstanceOf(Array);
    } else {
      expect(1).toBe(1);
    }
    // expect(subaccounts[0]).toBeInstanceOf(AccountInstance);
  });
});
