# ticketswift-webapp

This repository provides a web application for purchasing event tickets

## Environment Variables

This project relies on some environment variables for configuration.

| Variable            | Description                                           |
|---------------------|-------------------------------------------------------|
| VITE_TICKETSWIFT_HOST_URL   | URL of the backend application                  |

Before running the application, make sure to set the required environment variables. You can do this by renaming the `.env.example` file in the root of your project, populating it with the necessary values and rename it as `.env`. 

## Deployment

Run the following docker commands to deploy the application

```bash
sudo docker build --no-cache -t ticketswift-webapp .
sudo docker run --name ticketswift-webapp -d -p 3000:3000 --env-file .env ticketswift-webapp
```
