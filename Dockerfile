# Step 1: Build the React frontend
FROM node:18 AS build-frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Step 2: Build the NestJS API
FROM node:18 AS build-api
WORKDIR /api
COPY api/package*.json ./
RUN npm install
COPY api/ ./
RUN npm run build

# Step 3: Prepare the final production container
FROM nginx:alpine
WORKDIR /app

# Copy React build files to NGINX
COPY --from=build-frontend /frontend/dist /usr/share/nginx/html

# Copy NestJS API files
COPY --from=build-api /api /app/api

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose necessary ports
EXPOSE 80 3000
# Start both the API and NGINX
CMD ["sh", "-c", "node /app/api/dist/main.js & nginx -g 'daemon off;'"]
