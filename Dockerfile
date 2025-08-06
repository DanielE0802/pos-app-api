FROM node:18

WORKDIR /usr/src/app

# Copiar dependencias y código fuente
COPY package*.json ./
RUN npm install

COPY . .

# Instala herramientas de desarrollo como ts-node-dev
RUN npm install --save-dev ts-node-dev

# Expone el puerto configurado
EXPOSE 3000

# Inicia en modo desarrollo (verá cambios automáticamente)
CMD ["npm", "run", "start:dev"]