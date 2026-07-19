FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3001
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT [ "sh", "./entrypoint.sh" ]