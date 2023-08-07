# Perfectly Planned

## Setup

This application uses `Docker` to containerize the app.

1. Ensure `Docker` and the `docker-compose` CLI are installed.
2. Run `docker-compose up -d --build` to build and start the application in detached mode.
3. Stop docker by running `docker-compose down` or `docker-compose stop`
4. To bash into a container run `docker ps` to view `container_ids` and then run `docker exec -it <container_id> bash`
5. To view a containers logs run `docker container logs <container_id> --follow`

## Backend

## Frontend
