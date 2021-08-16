#build.sh

#Step 1: Bundle contracts into single file
npx swagger-cli bundle ./src/contracts/openapi.json --outfile ./dist/openapi.json --type json

#Step 2: Transpile + bundle ts files into dist folder
npx tsc