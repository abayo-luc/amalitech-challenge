# Stage 1: Build
FROM node:latest as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Production
FROM node:alpine


WORKDIR /app


COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy built assets from the builder stage
COPY --from=builder /app .


EXPOSE 3000

CMD ["yarn", "start"]
