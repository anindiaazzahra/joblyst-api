FROM node:14
WORKDIR /app
ENV PORT=5000
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start"]