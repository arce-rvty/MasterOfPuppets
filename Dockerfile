FROM node:18-alpine
WORKDIR /app/

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
COPY index.html /app/
COPY tsconfig.json /app/
COPY vite.config.ts /app/
COPY tsconfig.node.json /app/
COPY yarn.lock /app/
RUN yarn install


CMD ["yarn", "run", "dev", "--host=0.0.0.0"]
EXPOSE 3000