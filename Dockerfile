FROM ubuntu
RUN apt-get update

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y npm
RUN npm install
RUN npm run build
