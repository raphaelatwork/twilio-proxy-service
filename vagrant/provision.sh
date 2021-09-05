#provision_script.sh

#Download Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

#Finish NVM install
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

#Set Node version to install
echo "14.17.4" > .nvmrc

#Install Node
nvm install

#Install Yarn 
npm install -g yarn

#Install Prism - Used to run mock server
yarn global add @stoplight/prism-cli

#Add yarn binaries to PATH
echo "PATH=\"$PATH:$(yarn global bin)\"" >> "$HOME/.bash_profile"

#Clean install of dependencies
rm -rf /project/node_modules
npm --prefix /project install