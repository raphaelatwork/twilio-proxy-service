// // index.test.ts
import app from './app';
import supertest from 'supertest';
import ICreateSubaccount from '../contracts/types/ICreateSubaccount';
const request = supertest(app);
import {ConfigOptions} from './config';

describe('/account/:accountSid/createSubAccount.json', () => {
  it('should respond with 201 and a new subaccount', async () => {
    const dummyAccountSid = 'AC12341234123412341234123412341234';
    const createSubaccountDetails: ICreateSubaccount = {
      accountSid: dummyAccountSid,
      friendlyName: 'dummySubaccount1',
    };
    const res = await request.post(`/account/${dummyAccountSid}/subAccounts/createSubaccount.json`)
        .send(createSubaccountDetails)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('sid', expect.any(String));
    expect(res.body).toHaveProperty('ownerAccountSid', expect.any(String));
    expect(res.body).toHaveProperty('friendlyName', expect.any(String));
    /**
     * TODO: Test body against JSON Schema of AccountInstance type
     * See: https://javascript.plainenglish.io/how-to-test-json-schema-with-ajv-in-typescript-bd0361e0c03e
     */
    // expect(res.body).toBeInstanceOf(AccountInstance);
  });
  it('should respond with 400', async () => {
    const dummyAccountSid = 'AC12341234123412341234123412341234';
    const createSubaccountDetails = {
      friendlyName: 'dummySubaccount1',
    };
    const res = await request.post(`/account/${dummyAccountSid}/subAccounts/createSubaccount.json`)
        .send(createSubaccountDetails)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.statusCode).not.toBe(201);
    expect(res.statusCode).toBe(400);
  });
});

/**
 * Note: If your code uses the .list or .each methods that are available
 * (such as client.messages.list(), running your code against the mock will
 * cause it to throw an error. This is because the mocked next_page_uri value
 * will be http://example.com, which will cause the request to 404 against
 * Prism. Therefore, we're not going to run this test against the mock server
 * since it's testing a method that makes use of .list.
 */
if (ConfigOptions.envName !== 'LOCAL') {
  describe('/account/:accountSid/subaccounts.json', () => {
    it('should respond with 200 and a list of  subaccounts', async () => {
      const dummyAccountSid = 'AC12341234123412341234123412341234';
      const res = await request.get(`/account/${dummyAccountSid}/subAccounts.json`)
          .set('Accept', 'application/json');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      /**
        * TODO: Test body against JSON Schema of AccountInstance type
        * See: https://javascript.plainenglish.io/how-to-test-json-schema-with-ajv-in-typescript-bd0361e0c03e
        */
      // expect(res.body).toBeInstanceOf(AccountInstance);
    });

    it('should respond with 404 because of typo in endpoint', async () => {
      const dummyAccountSid = 'AC12341234123412341234123412341234';
      const createSubaccountDetails = {
        friendlyName: 'dummySubaccount1',
      };
      const res = await request.get(`/account/${dummyAccountSid}/subAccountss.json`)
          .send(createSubaccountDetails)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');
      expect(res.statusCode).not.toBe(200);
      expect(res.statusCode).toBe(404);
    });
  });
}
