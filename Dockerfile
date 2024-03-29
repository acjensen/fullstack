FROM --platform=linux/arm64 node:20
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
ENV NEXTAUTH_URL=https://acjensen-desktop.com
# TODO: use ENTRYPOINT instead of CMD so ctrl-c works for local dev
CMD ["npm", "run", "start", "--", "-p", "80"]
