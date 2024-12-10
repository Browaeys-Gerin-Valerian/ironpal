# Use the official Node.js image
FROM node:20-bullseye-slim

# Set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port on which your backend runs
EXPOSE 3000

RUN npx prisma generate

CMD ["npm", "run", "dev"]
