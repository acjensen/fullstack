FROM --platform=linux/arm64 node:20
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app
# Installing dependencies
COPY package*.json ./
RUN npm install
# Copying source files
COPY . .
# Building app
RUN npm run build
EXPOSE 80
# Running the app
# CMD [ "npm", "start" ]
CMD ["npm", "run", "start", "--", "-p", "80"]
