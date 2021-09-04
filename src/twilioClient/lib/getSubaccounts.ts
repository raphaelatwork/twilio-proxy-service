// getSubaccounts.ts
import twilio from 'twilio';
import RequestClient from 'twilio/lib/base/RequestClient';
import {AccountInstance, AccountListInstanceOptions}
  from 'twilio/lib/rest/api/v2010/account';

/**
 * Returns a list of Twilio Subaccounts belonging to the parent account provided
 * @param {string} parentAccountSid unique id for the account this subaccount will belong to
 * @param {RequestClient} httpClient implements Twilio's RequestClient class definition
 * @param {string} parentAccountApiKey api key for parent account
 * @param {string} parentAccountApiSecret api secret for parent account
 * @return {AccountInstance|AccountResource} describes the newly created subAccount
 */


export default async (
    parentAccountSid: string
    , httpClient: RequestClient
    , parentAccountApiKey: string
    , parentAccountApiSecret: string): Promise<AccountInstance[]> => {
  const clientOptions: twilio.Twilio.TwilioClientOptions = {
    accountSid: parentAccountSid,
    httpClient,
  };
  const client = new twilio.Twilio(parentAccountApiKey, parentAccountApiSecret, clientOptions);
  const listOpts: AccountListInstanceOptions = {limit: 20};
  const subaccounts = await client.api.accounts.list(listOpts);
  return subaccounts;
};
