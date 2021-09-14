# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install --save dd-trace
RUN npm install winston express-winston
COPY ./ ./

# Default command
#CMD ["npm", "start"]
CMD node --require dd-trace/init index.js