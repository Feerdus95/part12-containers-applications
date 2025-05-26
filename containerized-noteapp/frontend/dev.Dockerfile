FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
