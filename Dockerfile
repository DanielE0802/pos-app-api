# Etapa de construcción
FROM node:18 AS build
WORKDIR /usr/src/app

# Copiar los archivos necesarios
COPY package*.json ./
RUN npm install
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18 AS prod
WORKDIR /usr/src/app

# Copiar las dependencias necesarias
COPY package*.json ./
RUN npm install --only=production

# Copiar la carpeta dist desde la etapa de construcción
COPY --from=build /usr/src/app/dist ./dist

# Configurar variables de entorno
ENV NODE_ENV=production
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
