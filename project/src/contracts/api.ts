import { api, body, endpoint, request, response, String } from "@airtasker/spot";
import './endpoints/communicationPlatformEndpoints'
import './endpoints/countryEndpoints'
import './endpoints/regionEndpoints'

@api({ name: "cp-accounts-api", version: '1.0.0'})
class Api {}