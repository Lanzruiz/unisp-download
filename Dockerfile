# Uses the node base image with the latest LTS version
FROM node:18-alpine
# Informs Docker that the container listens on the 
# specified network ports at runtime
EXPOSE 5173
# Copies index.js and the two package files from the local 
# directory to a new app directory on the container
COPY . .
# Changes working directory to the new directory just created
WORKDIR /app
# Installs npm dependencies on container
RUN npm install
# Command container will actually run when called
CMD ["node", "app.js"]