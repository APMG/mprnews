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

COPY . ${APP_PATH}

WORKDIR ${APP_PATH}
RUN npm install

EXPOSE 3000
ENV NODE_ENV=${NODE_ENV} RAILS_ENV=${RAILS_ENV}
# CMD is for default parameters that can be overridden
CMD  ["-r",  "esm", "server.js"] 

# CMD is for commands that take params from CMD
ENTRYPOINT ["node"]
