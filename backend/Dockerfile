# Utiliser une image Node.js avec NestJS préinstallé
FROM node:14-alpine

# Créer le dossier de l'application dans le conteneur
WORKDIR /app

# Copier les fichiers de configuration de l'application
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code de l'application
COPY . .

# Exposer le port que NestJS utilisera
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start"]

