# Employees App / Server  
___   

### Technologies:  
- _[Node.js](https://nodejs.org/en)_
- _[TypeScript](https://www.typescriptlang.org/)_
- _[Express](https://expressjs.com/)_
- _[Prisma ORM](https://www.prisma.io/)_ 
- _[Express Validator](https://express-validator.github.io/)_  
- _[JWT](https://jwt.io/)_
- _[ESLint](https://eslint.org/) with [ESLint Stylistic](https://eslint.style/)_   
___   

### Routes  
- `/api/v1`
  - `/users`
    - `POST /login`
    - `POST /register`  
    - `GET /current`  
___  

### To run  
From root  
1. Configure `.env` file (see [.example.env](.example.env) for details)
2. `npm install`  
3. `npm run prisma:migrate`  
4. `npm run dev`