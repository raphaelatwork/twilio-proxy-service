// createSubAccount.ts
import {Twilio} from 'twilio';
import RequestClient from 'twilio/lib/base/RequestClient';
import {AccountInstance, AccountResource}
  from 'twilio/lib/rest/api/v2010/account';

/**
 * Returns a new subAccount created on Twilio belonging to the parent account provided
 * @param {string} friendlyName user friendly name for subAccount
 * @param {string} parentAccountSid unique id for the account this subaccount will belong to
 * @param {RequestClient} httpClient implements Twilio's RequestClient class definition
 * @param {string} parentAccountApiKey api key for parent account
 * @param {string} parentAccountApiSecret api secret for parent account
 * @return {AccountInstance|AccountResource} describes the newly created subAccount
 */
async function createSubAccount(
    friendlyName: string
    , parentAccountSid: string
    , httpClient: RequestClient
    , parentAccountApiKey: string
    , parentAccountApiSecret: string): Promise<AccountResource|AccountInstance> {
  const clientOptions: Twilio.TwilioClientOptions = {
    accountSid: parentAccountSid,
    httpClient,
  };
  try {
    const client = new Twilio(parentAccountApiKey, parentAccountApiSecret, clientOptions);
    const account = await client.api.accounts.create({friendlyName});
    return account;
  } catch (err) {
    // TODO: log error
  }
}

export default createSubAccount;
