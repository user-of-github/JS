# Blog Application / Server

___  

### Technologies:

- _[Express]()_
- _[TypeScript](https://www.typescriptlang.org/)_
- _[Class Validator](https://github.com/typestack/class-validator) and [Class Transformer](https://github.com/typestack/class-transformer) for DTO validation_
- _[Prisma](https://www.prisma.io/)_
- _[Mongo DB](https://www.mongodb.com/)_
- _[Docker](https://www.docker.com/) for running Mongo_

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
3. Do not forget to edit `DATABASE_URL` in `.env.local` and add there necessary port (here - 27017), user (here "user") and password (here "root")  
4. `npm install`  
5. `npm run prisma:db-push-local`  

___  

### API Routes  
- `/api/v1`
    - `/users`
        - `/:id`, _GET_
        - `/current`, _GET_
    - `/auth`
        - `/login`, _POST_
        - `/register`, _POST_