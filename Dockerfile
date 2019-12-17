FROM node:lts-alpine3.9
LABEL maintainer="ghankerson@mpr.org"

RUN mkdir --parents /opt/mprnews && \
    apk add --update --no-cache \
    bash \
    build-base \
    git

COPY . /opt/mprnews

WORKDIR /opt/mprnews
RUN npm install

EXPOSE 3000
ENV NODE_ENV="development" RAILS_ENV="development"
# CMD is for default parameters that can be overridden
CMD  ["-r",  "esm", "server.js"] 

# CMD is for commands that take params from CMD
ENTRYPOINT ["node"]
