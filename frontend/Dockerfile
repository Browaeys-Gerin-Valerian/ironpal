# Use the official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port on which your frontend runs
EXPOSE 5173

CMD ["npm", "run", "dev"]
