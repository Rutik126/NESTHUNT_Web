FROM node:18

# Install git
RUN apt-get update && apt-get install -y git

# Set working directory
WORKDIR /workspace

# Install global dependencies
RUN npm install -g nodemon

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd client && npm install
RUN cd server && npm install

# Copy the rest of the application
COPY . .

# Expose ports
EXPOSE 3000 5000

# Create startup script
RUN echo '#!/bin/sh\n\
cd /workspace/server && npm run dev & \
cd /workspace/client && npm run dev & \
wait' > /workspace/start.sh && \
chmod +x /workspace/start.sh

# Start both frontend and backend
CMD ["/workspace/start.sh"] 