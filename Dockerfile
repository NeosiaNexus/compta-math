# Étape 1 : Utiliser une image de base légère pour les dépendances
FROM node:18-alpine AS dependencies

# Définir des variables d'environnement
ENV APP_HOME=/app
ENV NODE_ENV=production

# Définir le répertoire de travail dans le conteneur
WORKDIR $APP_HOME

# Copier uniquement les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de production
RUN npm ci --only=production

# Étape 2 : Utiliser une image de base légère pour la construction
FROM node:18-alpine AS build

# Définir des variables d'environnement
ENV APP_HOME=/app
ENV NODE_ENV=production

# Définir le répertoire de travail dans le conteneur
WORKDIR $APP_HOME

# Copier les dépendances de l'étape de dépendances
COPY --from=dependencies /app/node_modules ./node_modules

# Copier le reste des fichiers de l'application
COPY . .

COPY .env .env

# Exécuter Prisma generate et construire l'application
RUN npx prisma generate \
    && npm run build \
    && npm prune --production \
    && rm -rf /var/cache/apk/*

# Étape 3 : Utiliser une image de base légère pour le déploiement
FROM node:18-alpine

# Définir des variables d'environnement
ENV APP_HOME=/app
ENV NODE_ENV=production

# Définir le répertoire de travail dans le conteneur
WORKDIR $APP_HOME

# Copier les fichiers nécessaires de l'étape de construction
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env ./.env
COPY --from=build /app/.next/static ./.next/static

# Exposer le port que l'application utilise
EXPOSE 3000

CMD ["npm", "start"]
