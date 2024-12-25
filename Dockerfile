# Etapa de construcción
FROM node:18 AS build
WORKDIR /usr/src/app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18 AS prod
WORKDIR /usr/src/app

# Copiar solo las dependencias necesarias
COPY package*.json ./
RUN npm install --only=production

# Copiar la carpeta 'dist' generada en la etapa de construcción
COPY --from=build /usr/src/app/dist ./dist

# Configurar el entorno de producción
ENV NODE_ENV=production
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
