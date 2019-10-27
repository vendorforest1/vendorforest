#FROM node:10-alpine
FROM openjdk:8-jdk

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get update && \
    apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn

# run as non-root user inside the docker container
# see https://vimeo.com/171803492 at 17:20 mark
RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs

# now run as new user nodejs from group nodejs
USER nodejs

# Create an app directory (in the Docker container)
RUN mkdir -p /home/node/app/node_modules && chown -R openjdk:openjdk /home/node/app
WORKDIR /home/node/app

#COPY dist ./

RUN echo "*******" $CONNSTR

COPY package.json /home/nodejs/app/package.json

# and install dependencies
RUN yarn install --production

# Copy our source into container
COPY --chown=nodejs:nodejs . /home/nodejs/app

EXPOSE 4444

#investigate 
#docker run -it --entrypoint sh vendorforest/demov1.0
ENV NODE_ENV production

CMD [ "yarn", "start" ]