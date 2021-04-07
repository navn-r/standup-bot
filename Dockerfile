FROM node:14.15-alpine

WORKDIR /usr/app

# Install node dependencies - done in a separate step so Docker can cache it.
COPY yarn.lock .
COPY package.json .

RUN yarn install --non-interactive --frozen-lockfile && yarn cache clean

COPY . .

CMD ["node", "index.js"]