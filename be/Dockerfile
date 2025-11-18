FROM node:lts

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port (internal to container network)
EXPOSE 785

# Start the application
CMD ["node", "server.js"]
