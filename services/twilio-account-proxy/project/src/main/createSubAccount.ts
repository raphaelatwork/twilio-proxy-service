//createAccounts.ts
import { ConfigOptions as proxyConfigOptions } from "../supporting/config";
import { Twilio } from "twilio";
import { AccountInstance, AccountResource } from "twilio/lib/rest/api/v2010/account";
import * as Version from "twilio/lib/base/Version";

const client = new Twilio(proxyConfigOptions.accountSid, proxyConfigOptions.accountAuthToken);

export default async function createSubAccount (friendlyName: string): Promise<AccountResource|AccountInstance> {
    const account = await client.api.accounts.create({ friendlyName });
    return account;
}