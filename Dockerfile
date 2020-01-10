FROM node:13.6.0-alpine3.11
WORKDIR /app
COPY src/* ./
COPY package*.json  ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
