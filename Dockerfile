FROM node:lts-alpine3.11
LABEL maintainer="ghankerson@mpr.org"

ARG NODE_ENV="development"
ARG APP_PATH=/opt/mprnews
ARG APP_USER=node
ARG APP_GROUP=node
ARG APP_USER_UID=1000
ARG APP_GROUP_GID=1000
ARG GRAPHQL_API=https://cmsapi.publicradio.org/graphql
ARG POTLATCH_API=https://cmsapi.publicradio.org/graphql
ARG SCHEDULER_API=http://scheduler-service/api/v1/services/3/schedule/
ARG CONTENT_AREA_SLUG=mprnews

RUN apk add --update --no-cache \
    bash \
    build-base \
    shadow \
    git \
    yarn && \
    deluser --remove-home node && \
    echo "CREATE_MAIL_SPOOL=no" >> /etc/default/useradd && \
    groupadd -g ${APP_GROUP_GID} ${APP_GROUP} && useradd -m -l -u ${APP_USER_UID} -g ${APP_GROUP_GID} ${APP_USER} && \
    mkdir --parents ${APP_PATH} && \
    chown ${APP_USER}:${APP_GROUP} ${APP_PATH}

WORKDIR ${APP_PATH}
USER $APP_USER

COPY --chown=${APP_USER}:${APP_GROUP} ./package.json ${APP_PATH}/
COPY --chown=${APP_USER}:${APP_GROUP} ./yarn.lock ${APP_PATH}/

# Need to make node_modules and build to ensure that
# mount points are owned by current user (node).
RUN mkdir ${APP_PATH}/node_modules $APP_PATH/build && yarn install --production=false

COPY --chown=${APP_USER}:${APP_GROUP} . ${APP_PATH}

ENV NODE_ENV=${NODE_ENV} RAILS_ENV=${NODE_ENV} GRAPHQL_API=${GRAPHQL_API} POTLATCH_API=${POTLATCH_API} SCHEDULER_API=${SCHEDULER_API} CONTENT_AREA_SLUG=${CONTENT_AREA_SLUG}

RUN rm -rf ${APP_PATH}/.env.production && yarn run build && yarn cache clean

EXPOSE 3000

# CMD is for default parameters that can be overridden
CMD  ["yarn", "start"]
