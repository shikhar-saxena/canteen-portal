# Get node v16 alpine image (for less container size) 
FROM node:16-alpine

# Change working directory to backend
WORKDIR /backend

# Copy package.json and package-lock.json into container
# do clean install (using the package.json and package-lock.json file) 
COPY package*.json ./
RUN npm ci

# copy backend code into container
COPY . ./

# host backend
CMD ["npm", "start"]