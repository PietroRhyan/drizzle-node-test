# Just an study project using Node, Drizzle and Vitest

A simple CRUD project to practice the best practices of programming in backend development with Node,
Typescript, Drizzle ORM and Vitest.

## Setup the project

Clone the project and run the following commands:

```
npm i

or

pnpm i

or 

yarn
```

Here I'm using Docker Compose to generate my Postgres Database Image with some credentials, I recommend you 
to use the same credentials of your env file. The key of the values of the credentials is in `.env.example` 

After you setup and initiate your Postgres Image, you need to generate the migations and push to database. 
See the code below:

```
npm run migrations:generate

or 

pnpm run migrations:generate

or 

yarn migrations:generate
``` 

then push to database

```
npm run migrations:push

or 

pnpm run migrations:push

or 

yarn migrations:push
``` 

After that, you can run your server in localhost:3333

```
npm run dev

or 

pnpm run dev

or 

yarn dev
```