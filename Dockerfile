# Usa uma imagem do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia todos os arquivos do projeto para dentro do container
COPY . .

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]