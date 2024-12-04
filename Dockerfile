
# Node version
FROM node:20

# Make work directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
COPY jsconfig.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY . ./

# Install packages 
RUN npm install

# Build application
RUN npm run build

# Install global serve
RUN npm install -g serve

# PORT defined
EXPOSE 80

# Execute command
CMD ["serve", "-s", "build", "-p", "80"]