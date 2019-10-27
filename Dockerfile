FROM node:10-alpine

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn

# run as non-root user inside the docker container
# see https://vimeo.com/171803492 at 17:20 mark
#RUN groupadd -r nodejs && useradd -m -r -g nodejs nodejs

# Create an app directory (in the Docker container)
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

#COPY dist ./

RUN echo "*******" $CONNSTR

COPY package.json ./
#COPY .npmrc /usr/src/demo-server

# and install dependencies
RUN npm i

# Copy our source into container
COPY . .

COPY --chown=node:node . .

# now run as new user nodejs from group nodejs
USER node

EXPOSE 4444

#investigate 
#docker run -it --entrypoint sh vendorforest/demov1.0

#CMD [ "yarn", "start" ]
CMD ["node", "dist"]