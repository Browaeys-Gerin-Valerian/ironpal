## Ironpal overview:

Ironpal is a web application for weight training that allows users to plan, track, and customize their workouts.

It focuses on organizing effective training sessions by offering a vast library of exercises, which can be grouped into sessions and scheduled over a week.

The goal is to provide a simple and intuitive tool to help users optimize their workouts while offering features to track their progress and adjust their routines.

the app is available on https://ironpal-389909b3fcfe.herokuapp.com/
the backend service is available onj https://ironpal-api-0b7ccae63a57.herokuapp.com/

## Set up:

1. At the root of the project copy `docker.env.example` to `docker.env` and add your local values.
2. Go to /backend directory and copy `.env.example` to `.env` and add your local values.
3. Return to the root of the project and execute the following command `docker compose up`

### Docker Configuration

- To start all containers: `docker compose up` or `docker compose up -d`
- To stop all containers: `docker compose down`

The docker-compose.yml file contains configurations for the following services:

- backend: The main server of the application
- database: The PostgreSQL database
- adminer: The Adminer web interface for database management

### Connecting to Adminer

Once the database container has started, open a browser and go to the URL: http://localhost:8080 You will see the Adminer interface.

Fill in the fields with the following information:

- System: PostgreSQL
- Server: database
- Username: the username you specified in docker.env
- Password: the password you specified in docker.env
- Database: the value specified in docker.env

Click "Connect."

Once connected via Adminer, you can:

Browse tables and their data
Execute SQL queries
Create, modify, or delete tables and data

## Connecting to Prisma

If you feel the need to check data in prisma studio you have to follow these steps:

1. Use this commande to `docker exec -it backend sh`
2. Once in the container's shell exec `npx prisma studio` command
3. Open prisma studio on `http://localhost:5555/`

## Naming Conventions

### Commits

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/). Each commit message must be formatted with the following convention:

```md
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Examples:

- feat: add contact form
- fix(lang): fix language typos
- chore(templating): add pull request template

### Branches

We use something similar to our commit naming convention :

```md
<type>/<description>
```

Examples:

- feat/contact-form
- fix/language-typos
- chore/pr-template
