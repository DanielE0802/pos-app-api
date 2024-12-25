# Etapa de construcción
FROM node:18 AS build
WORKDIR /usr/src/app

# Copiar los archivos necesarios
COPY package*.json ./
RUN npm install
COPY . .

# Argumento para definir el entorno (development o production)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Construcción en producción
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Etapa de producción
FROM node:18 AS prod
WORKDIR /usr/src/app

# Copiar dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Copiar la carpeta de distribución desde la etapa de construcción
COPY --from=build /usr/src/app/dist ./dist

# Configurar variables de entorno
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
