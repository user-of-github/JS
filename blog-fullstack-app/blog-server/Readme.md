# Blog Application / Server

API service for blog application. Built with authentication, middleware, dto validation, database, OOP and other
concepts and principles.
___  

### Technologies:

- _[Express]()_
- _[TypeScript](https://www.typescriptlang.org/)_
- _[Class Validator](https://github.com/typestack/class-validator)
  and [Class Transformer](https://github.com/typestack/class-transformer) for DTO validation_
- _[Prisma](https://www.prisma.io/)_
- _[Mongo DB](https://www.mongodb.com/)_
- _[Docker](https://www.docker.com/) for running Mongo_
- _[JWT](https://jwt.io/)_

___  

### To launch application:

I used Docker to pull and run container with MongoDB:

1. `docker pull prismagraphql/mongo-single-replica:5.0.3`
2. ```
   docker run --name mongo 
   -p 27017:27017 
   -e MONGO_INITDB_ROOT_USERNAME="user" 
   -e MONGO_INITDB_ROOT_PASSWORD="root" 
   -d prismagraphql/mongo-single-replica:5.0.3
   ```
3. Copy and set up all contents for `.env.local` (create this file), use `.env.example` as template
4. Do not forget to edit `DATABASE_URL` in `.env.local` and add there necessary port (here - 27017), user (here "user")
   and password (here "root")
5. `npm install`
6. `npm run prisma:db-push-local`
7. `npm run prisma:generate-local`
8. `npm run start:dev`

___  

### API Routes

- `/api/v1`
    - `/users`
        - `/:id`, _GET_
        - `/:id`, _PUT_
        - `/current`, _GET_
    - `/auth`
        - `/login`, _POST_
        - `/register`, _POST_
    - `/posts`
        - `/`, _GET_
        - `/`, _POST_
        - `/:id`, _GET_
        - `/:id`, _DELETE_