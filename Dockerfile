FROM node:lts-alpine3.9
LABEL maintainer="ghankerson@mpr.org"

ARG APP_PATH=/opt/mprnews
ARG NODE_ENV="development"
ARG RAILS_ENV="development"
ARG NODE_MODULES_PATH=/opt/node_modules

RUN mkdir --parents ${APP_PATH} && \
    mkdir --parents ${NODE_MODULES_PATH} && \
    apk add --update --no-cache \
    bash \
    build-base \
    git

COPY . ${APP_PATH}
COPY ./package.json ${NODE_MODULES_PATH}

WORKDIR ${NODE_MODULES_PATH}
RUN npm install 

ENV PATH ${NODE_MODULES_PATH}/.bin:$PATH

WORKDIR ${APP_PATH}
EXPOSE 3000
ENV NODE_ENV=${NODE_ENV} RAILS_ENV=${RAILS_ENV}
# CMD is for default parameters that can be overridden
CMD  ["-r",  "esm", "server.js"] 

# CMD is for commands that take params from CMD
ENTRYPOINT ["node"]
