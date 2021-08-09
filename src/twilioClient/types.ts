// types.ts
export interface ITwilioAccountSecrets {
    accountSid: string;
    accountAuthToken: string;
}

export interface IServerSettings {
   endpointUrl: string;
}

export type TProxyConfigOptions = ITwilioAccountSecrets & IServerSettings;
