FROM node:lts-alpine3.9
LABEL maintainer="ghankerson@mpr.org"

ARG APP_PATH=/opt/mprnews
ARG NODE_ENV="development"
ARG RAILS_ENV="development"
ARG APP_USER=node
ARG APP_GROUP=node
ARG APP_USER_UID=1000
ARG APP_GROUP_GID=1000


RUN apk add --update --no-cache \
    bash \
    build-base \
    shadow \
    git \
    yarn && \
    deluser --remove-home node && \
    groupadd -g ${APP_GROUP_GID} ${APP_GROUP} && useradd -m -l -u ${APP_USER_UID} -g ${APP_GROUP_GID} ${APP_USER} && \
    mkdir --parents ${APP_PATH} && \
    chown ${APP_USER}:${APP_GROUP} ${APP_PATH} 

COPY --chown=${APP_USER}:${APP_GROUP} ./package.json ${APP_PATH}/
COPY --chown=${APP_USER}:${APP_GROUP} ./yarn.lock ${APP_PATH}/

WORKDIR ${APP_PATH}

USER $APP_USER

# Need to make node_modules and build to ensure that 
# mount points are owned by current user (node).
RUN mkdir ${APP_PATH}/node_modules $APP_PATH/build && yarn

EXPOSE 3000

ENV NODE_ENV=${NODE_ENV} RAILS_ENV=${RAILS_ENV}

COPY --chown=${APP_USER}:${APP_GROUP} . ${APP_PATH}

# CMD is for default parameters that can be overridden
CMD  ["node", "-r",  "esm", "server.js"]

