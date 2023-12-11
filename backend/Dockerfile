FROM node:18-alpine

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN npm install --production

RUN npm install -g @nestjs/cli

# Bundle app source

COPY . .

# Build
RUN npm run build

EXPOSE ${PORT:-8080}

CMD [ "npm", "run", "start:prod" ]