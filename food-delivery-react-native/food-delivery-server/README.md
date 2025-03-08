# React Native Delivery Food / Server  
___  
### Tech stack:  
- _[Node.js](https://nodejs.org/en)_  
- _[NestJS](https://nestjs.com/)_  
- _[TypeScript](https://www.typescriptlang.org/)_  
- _[Prisma](https://www.prisma.io/)_  
- _[PostgreSQL](https://www.postgresql.org/)_  
- _[JWT](https://jwt.io/)_  
___  
### To run:  
1. `npm install`  
2. Create Postgres Database `react-native-food-delivery` (actually any DB, but you will need to write its name, host and password to `.env`)  
3. Make sure PostgreSQL Service is running (you can just check for example via `PgAdmin`). If not - start PostgreSQL service (for example via Windows Services)
3. Create your `.env` file (see `.env.example` as a template or just copy it. But don't forget to make it suitable for DB created in _part 2_)
4. Sync Prisma with your DB instance. Something like:  
    - `npx prisma migrate` or `npx prisma migrate --dev`
    - `npx prisma generate`  
5. `npm run start:dev`    