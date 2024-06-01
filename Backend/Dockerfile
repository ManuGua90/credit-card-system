# Utilizar una imagen base de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar archivos de configuración de Node.js y instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto que utiliza tu aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
