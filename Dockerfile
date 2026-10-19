# Multi-stage production build for FORTIS FIT
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install

# Copy application source & static assets
COPY tsconfig*.json nest-cli.json ./
COPY src/ ./src/
COPY public/ ./public/

# Compile TypeScript
RUN npm run build

# Prune devDependencies to keep production image light
RUN npm prune --production

# Stage 2: Minimal runtime image
FROM node:20-alpine AS runner

WORKDIR /app

# Install tzdata for West Africa Time (Africa/Lagos / WAT = UTC+1) and ffmpeg for GIF conversion
RUN apk add --no-cache tzdata ffmpeg
ENV TZ=Africa/Lagos
ENV NODE_ENV=production
ENV PORT=3005

# Copy production artifacts from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Ensure local data fallback directory and exercise assets directory exist and have proper permissions
RUN mkdir -p .data public/assets/exercises && chown -R node:node /app

USER node

EXPOSE 3005

CMD ["node", "dist/main.js"]

