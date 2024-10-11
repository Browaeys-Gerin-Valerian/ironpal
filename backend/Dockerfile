# Utilisation de l'image officielle Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tous les fichiers du projet
COPY . .

# Compiler le projet TypeScript
RUN npm run build

# Exposer le port sur lequel ton backend fonctionne
EXPOSE 3000

# Démarrer le serveur
CMD ["npm", "start"]
