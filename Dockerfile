FROM node:14

WORKDIR /app

RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/TarasRashkevych99/ticketswift-webapp.git .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
