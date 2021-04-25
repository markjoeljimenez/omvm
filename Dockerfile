FROM node:14.15.4-alpine AS deps

WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "develop"]
