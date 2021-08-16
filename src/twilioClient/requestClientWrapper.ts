// requestClientWrapper.ts
import RequestClient from 'twilio/lib/base/RequestClient';

/**
 * TODO: annotate class
 */
class RequestClientWrapper {
  url: string;
  requestClient: RequestClient;
  /**
   * Prism Client Constructor
   * @param {string} url endpoint url for prism instance
   * @param {RequestClient} requestClient implements Twilio RequestClient class definition
   */
  constructor(url: string, requestClient: RequestClient) {
    this.url = url;
    this.requestClient = requestClient;
  }
  /**
   * Returns the promise corresponding to the async call made by the requestClient 
   * with the options provided
   * @param {RequestClient.RequestOptions} opts
   * @return {Promise<any>}
   */
  request(opts: RequestClient.RequestOptions) {
    opts.uri = opts.uri.replace(/^https\:\/\/.*?\.twilio\.com/, this.url);
    return this.requestClient.request(opts);
  }
}
export default RequestClientWrapper;
