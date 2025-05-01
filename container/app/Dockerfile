FROM node:22.15.0-bullseye-slim

WORKDIR /home/node/app

USER root

RUN npm i -g npm@latest vercel@latest

COPY ./app /home/node/app
RUN chown -R node:node /home/node/app

# RUN npx playwright install-deps
# RUN npx playwright install

USER node