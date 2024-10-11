# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files
COPY . .

# Compile the TypeScript project
RUN npm run build

# Expose the port on which your backend runs
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
