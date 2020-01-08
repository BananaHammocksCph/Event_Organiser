FROM node:10

COPY package.json .
COPY package-lock.json .
 
RUN npm install
 
COPY . .
 
EXPOSE 3002
 
CMD [ "node", "app.js" ]