FROM node:lts-alpine3.9
LABEL maintainer="ghankerson@mpr.org"

ARG APP_PATH=/opt/mprnews
ARG APP_PATH_CODE=/opt/mprnews/app

ARG NODE_ENV=development
ENV NODE_ENV ${NODE_ENV}
ARG RAILS_ENV=development
ENV RAILS_ENV=${RAILS_ENV}

RUN mkdir --parents ${APP_PATH} && \
    mkdir --parents ${APP_PATH_CODE} && \
    apk add --update --no-cache \
    bash \
    build-base \
    git

# Build the node_modules folder
WORKDIR ${APP_PATH}
COPY package.json .
RUN npm install . --no-optional && npm cache clean --force

ENV PATH ${APP_PATH}/.bin:$PATH

# Deploy the app code
WORKDIR ${APP_PATH_CODE}
COPY . .

EXPOSE 3000
# ENTRYPOINT is for commands that take params from CMD
ENTRYPOINT ["node"]

# CMD is for default parameters that can be overridden
CMD  ["-r",  "esm", "server.js"] 
