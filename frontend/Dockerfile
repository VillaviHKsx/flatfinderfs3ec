# Etapa 1: build de la app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Nginx para servir archivos estáticos
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Si tu build genera 'build' en vez de 'dist', cambia la ruta anterior

# Copia configuración personalizada de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
