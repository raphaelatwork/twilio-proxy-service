// createAccount.ts
import {endpoint, request, response, body, headers} from '@airtasker/spot';
import IAccountResource from '../../resourceInterfaces/account/nouns/IAccountResource';
import ISubAccountResource from '../../resourceInterfaces/account/nouns/ISubAccountResource';
import ICreateSubAccountResource from '../../resourceInterfaces/account/verbs/ICreateSubAccountResource';

@endpoint({
  method: 'POST',
  path: '/country',
})
class CreateSubAccount {
    @request
  request(
      @headers
          headers: {
        Authorization: String;
      },
      @body body: CreateSubAccountRequest,
  ) {}

    @response({status: 201})
    successfulResponse(
      @body body: CreateCountryResponse,
    ) {}
}

type CreateSubAccountRequest = ICreateSubAccountResource;
type CreateCountryResponse = ISubAccountResource;
