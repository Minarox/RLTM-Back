ARG NODE_VERSION=20.14.0-alpine3.20

# Build stage
FROM node:$NODE_VERSION AS builder

WORKDIR /home/node/app
COPY . .

RUN npm install --only=production
RUN npm run build

# App stage
FROM node:$NODE_VERSION as app

RUN mkdir -p /home/node/app/node_modules \
    && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY --from=builder --chown=node:node /home/node/app/dist .
COPY --from=builder --chown=node:node /home/node/app/node_modules ./node_modules

USER node
ENV NODE_ENV=production
EXPOSE 5000
CMD [ "node", "index.js" ]
