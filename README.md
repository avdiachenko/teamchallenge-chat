A Teamchallenge Chat project repository

# Setup

## Backend

### Dotenv

TODO: anything need explanation? JWT secret generation?

for JWT_SECRET param use

```sh
openssl rand -base64 32
```

copy your `.env` file from `.env.example`, it should look similar to this

```sh
DB_HOST=mongodb://localhost:27017
JWT_SECRET=
DEPLOY_HOST=http://localhost:5174/
UKR_NET_PASSWORD=
UKR_NET_EMAIL=
CLOUDINARY_API_SECRET=
```

### NodeJS

Does not work with Node 22 due to 
[Import attributes](https://stackoverflow.com/questions/78876691/syntaxerror-unexpected-identifier-assert-on-json-import-in-node-v22) 
usage

Install required local node version using 
[Volta](https://docs.volta.sh/guide/)
or other tools

```bash
volta install node@21
```

Install dependencies

```bash
npm install
```

### Mongodb

Follow the 
[tutorial](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/#std-label-docker-mongodb-community-install)
on installing with docker or other means

```bash
docker pull mongodb/mongodb-community-server:latest
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

### Run backend

```
npm run dev
```

### Import initial/mock data (run migrations)

This step should be done after running backend, once collections are properly initialized

TODO: is this true, or it can be run earlier, after installing mongodb?

Unzip an encrypted archive using provided password, and import the database

```bash
unzip db-dump.zip
mongorestore --db test db-dump/test
```

If you updated some of the database content you wish to export into initial migration, use either of these commands:

```bash
mongodump --db test --collection users --out ./db-dump/
mongodump --db test --out ./db-dump/
```

Try not keeping sensitive data like emails and passwords in test database, but in case you missed something, do not commit data directly to git, but first zip it with password, and then commit a zip file.

```bash
zip --password PASSWORD db-dump.zip -r db-dump
```

### Docker image

TODO: replace with `Dockerfile` with all dependencies and versions set up?

## Frontend

Install dependencies

```bash
npm install
```

Run frontend with external backend server

```bash
npm run dev
```

Run frontend with local backend server

```bash
npm run local-dev
```