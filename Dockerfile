FROM node:14
WORKDIR /app
ENV PORT=5000
COPY package*.json ./
RUN sed -i '/"fsevents"/d' package-lock.json || true
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start"]