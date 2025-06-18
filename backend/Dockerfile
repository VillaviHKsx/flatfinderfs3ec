# Etapa 1: build de dependencias
FROM node:18-alpine

# Crea el directorio de la app
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

COPY .env .env

# Expone el puerto (ajusta si usas otro)
EXPOSE 4000

# Comando para iniciar el backend
CMD ["npm", "start"]
