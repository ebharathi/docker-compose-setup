FROM node:18 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine


COPY --from=build /app/dist /usr/share/nginx/html


# Copy the set-env.sh script into the build container (to use it later)
COPY set-env.sh /docker-entrypoint.d/set-env.sh

# Make sure the set-env.sh script is executable
RUN chmod +x /docker-entrypoint.d/set-env.sh
