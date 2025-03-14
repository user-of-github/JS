# React Native Delivery Food / Server  
___  
### Tech stack:  
- _[NestJS](https://nestjs.com/)_  
- _[TypeScript](https://www.typescriptlang.org/)_  
- _[Prisma](https://www.prisma.io/)_  
- _[PostgreSQL](https://www.postgresql.org/) and [SupaBase](https://supabase.com/) for DB free deployment_
- _[JWT](https://jwt.io/)_  
- _[Stripe](https://stripe.com/) (trial demo test profile) for payments_
___  
### To run:  
1. `npm install`  
2. Create Postgres Database `react-native-food-delivery` (actually any DB, but you will need to write its name, host and password to `.env`)  
3. Make sure PostgreSQL Service is running (you can just check for example via `PgAdmin`). If not - start PostgreSQL service (for example via Windows Services)
4. Create your `.env` file (see `.example.env` as a template or just copy it. But don't forget to make it suitable for DB created in _part 2_)
5. Sync Prisma with your DB instance. Something like:  
    - `npx prisma migrate` or `npx prisma migrate --dev` (but it will erase all data. So on my PC I use `npx prisma db push`, when already have data)
    - `npx prisma generate`   
6. Also check in `client` folder [Readme.md](../food-delivery-client/Readme.md) how to map ports, because connected by USB Android device does not see the port and Axios returns `NetworkError`  
7. `npm run start:dev`   
___  
### API endpoints:  
- `/auth`
  - `/login/access-token`, POST  
  - `/login`, POST  
  - `/register`, POST
- `/categories`  
    - `/`, GET  
    - `/by-id/:id`, GET  
    - `/by-slug/:slug`, GET  
    - `/`, POST  
    - `/:id`, PUT  
    - `/:id`, DELETE  
- `/products`, GET  
    - `/by-id/:id`, GET  
    - `/by-slug/:slug`, GET  
    - `/by-category/:categorySlug`, GET  
    - `/groupped-by-category`, GET  
    - `/` POST  
    - `/:id`, PUT  
    - `/:id`, DELETE   

- `/user`  
  - `/profile`, GET
  - `/favourites/:productId`, PATCH  
- `/orders`  
  - `/`, GET
  - `/by-user`, GET  
  - `/`, POST
