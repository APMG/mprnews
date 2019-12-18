FROM node:lts-alpine3.9
LABEL maintainer="ghankerson@mpr.org"

ARG APP_PATH=/opt/mprnews
ARG NODE_ENV="development"
ARG RAILS_ENV="development"

RUN mkdir --parents ${APP_PATH} && \
    apk add --update --no-cache \
    bash \
    build-base \
    git

COPY ./package*.json ${APP_PATH}/

WORKDIR ${APP_PATH}

RUN npm install

EXPOSE 3000

ENV NODE_ENV=${NODE_ENV} RAILS_ENV=${RAILS_ENV}

COPY . ${APP_PATH}

# CMD is for default parameters that can be overridden
CMD  ["node", "-r",  "esm", "server.js"]

