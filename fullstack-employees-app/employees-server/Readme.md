# Employees App / Server  
_Simple REST Api app with authorization, ORM, DTO validations and TypeScript of course._
___   

### Technologies:  
- _[Express](https://expressjs.com/)_
- _[TypeScript](https://www.typescriptlang.org/)_
- _[Prisma ORM](https://www.prisma.io/)_ 
- _[Express Validator](https://express-validator.github.io/)_  
- _[JWT](https://jwt.io/)_
- _[ESLint](https://eslint.org/) with [ESLint Stylistic](https://eslint.style/)_   
- _[TSX](https://tsx.is/)_
___   

### Routes  
- `/api/v1`
  - `/users`
    - `POST /login`
    - `POST /register`  
    - `GET /current` 
  - `/employees`
    - `GET /`
    - `POST /`
    - `GET /:id`
    - `PUT /:id`
    - `DELETE /:id`
___  

### To run  
From root  
1. Configure `.env` file (see [.example.env](.example.env) for details)
2. `npm install`  
3. `npm run prisma:migrate`  
4. `npm run dev`