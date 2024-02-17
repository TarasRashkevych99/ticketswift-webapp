# ticketswift-webapp

This repository provides a web application for purchasing event tickets

## Deployment

Run the following docker commands to deploy the application

```bash
sudo docker build -t ticketswift-webapp .
sudo docker run --name ticketswift-webapp --network ticketswift -d -p 3000:3000 --env-file .env ticketswift-webapp
```
