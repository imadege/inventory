# Stage 1: Build the NestJS application
FROM node:20 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image with PostgreSQL and NestJS
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Install PostgreSQL
RUN apt-get update && apt-get install -y \
    postgresql \
    postgresql-contrib \
    && apt-get clean

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Copy the SQL initialization script (optional)
#COPY init.sql /usr/src/app/init.sql

# Set up environment variables for PostgreSQL
ENV POSTGRES_USER=postgres_m
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=mydb

# Expose application and PostgreSQL ports
EXPOSE 3000 5432

# Define a volume for PostgreSQL data persistence
VOLUME /var/lib/postgresql/data

# Copy the startup script
COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
RUN chmod +x /usr/src/app/docker-entrypoint.sh

# Run the startup script
CMD ["sh", "/usr/src/app/docker-entrypoint.sh"]
