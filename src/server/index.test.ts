// // index.test.ts
import app from './app';
import supertest from 'supertest';
import CreateSubaccount from '../contracts/types/CreateSubaccount';
// import { AccountInstance } from 'twilio/lib/rest/api/v2010/account';
const request = supertest(app);

describe('/account/:accountSid/createSubAccount.json', () => {
  it('should respond with 201 and a new subaccount', async () => {
    const dummyAccountSid = 'AC12341234123412341234123412341234';
    const createSubaccountDetails: CreateSubaccount = {
      accountSid: dummyAccountSid,
      friendlyName: 'dummySubaccount1',
    };
    const res = await request.post(`/account/${dummyAccountSid}/subAccounts/createSubaccount.json`)
        .send(createSubaccountDetails)
        .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('sid', expect.any(String));
    expect(res.body).toHaveProperty('ownerAccountSid', expect.any(String));
    expect(res.body).toHaveProperty('friendlyName', expect.any(String));
    /**
     * TODO: Test body against JSON Schmea of AccountInstance type
     * See: https://javascript.plainenglish.io/how-to-test-json-schema-with-ajv-in-typescript-bd0361e0c03e
     */
    // expect(res.body).toBeInstanceOf(AccountInstance);
  });
  it('should respond with 400', async () => {
    const dummyAccountSid = 'AC12341234123412341234123412341234';
    const createSubaccountDetails = {
    };
    const res = await request.post(`/account/${dummyAccountSid}/subAccounts/createSubaccount.json`)
        .send(createSubaccountDetails)
        .set('Accept', 'application/json');
    expect(res.statusCode).toBe(400);
  });
});
