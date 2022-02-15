# Get node v16 alpine image (for less container size) 
FROM node:16-alpine

# Change working directory to frontend
WORKDIR /frontend

# Copy package.json and package-lock.json into container
# do clean install (using the package.json and package-lock.json file) 
COPY package*.json ./
RUN npm ci

# Install static server `serve` npm package
RUN npm install -g serve

# copy frontend code into container
COPY . ./

# Build react app
RUN npm run build

# static server hosting frontend
CMD serve -s -n build