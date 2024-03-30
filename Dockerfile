FROM --platform=linux/arm64 node:20
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app
COPY package*.json ./
# See https://github.com/npm/cli/issues/3208#issuecomment-1002990902
RUN mkdir node_modules
RUN npm ci --no-audit
COPY . .
RUN npm run build
EXPOSE 80
# TODO: use ENTRYPOINT instead of CMD so ctrl-c works for local dev
CMD ["npm", "run", "start", "--", "-p", "80"]
