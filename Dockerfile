FROM node:16.15.1
 
RUN mkdir -p /app

WORKDIR /app

#/usr/src/app
#COPY .env /app/.env

COPY package.json  /app
 
RUN npm install --force
 
COPY . /app

RUN npm install --force -g nodemon

CMD ["npm" , "start"]
 
EXPOSE 8080