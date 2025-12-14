# --- Stage 1: Build the React app ---
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

RUN npm install -g pnpm@10

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Accept build arguments for environment variables
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the app for production (this runs "npm run build" defined in your package.json)
RUN pnpm build

# --- Stage 2: Serve the static files with Nginx ---
FROM nginx:alpine AS runner 

# Copy the built files from the builder stage to Nginx's web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
