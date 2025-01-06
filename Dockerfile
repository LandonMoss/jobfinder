#Node.js base image
FROM node:16

#Working directory
WORKDIR /app

#Copy package.json and package-lock.json
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy source code
COPY . .

#Expose port
EXPOSE 3000

#Define commmand to run the application
CMD ["node", "server.js"]