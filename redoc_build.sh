#build.sh

#Step 1: Bundle contracts into single file
npx swagger-cli bundle ./src/contracts/openapi.json --outfile ./redoc/openapi.json --type json 
