# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install --save dd-trace
RUN npm install
COPY ./ ./

# Default command
#CMD ["npm", "start"]
#CMD ["node", "index.js"]
#CMD node --require dd-trace/init index.js
CMD ["node","index.js","--require dd-trace/init"]