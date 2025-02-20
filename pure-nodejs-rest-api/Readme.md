## Pure Node.js REST API application  
___   
Small REST-service to practice creating REST service without Express, Nest or similar library.
___  
### Technologies:
- _[Node.js](https://nodejs.org/)_  
- _[TypeScript](https://www.typescriptlang.org/) , with experimental Node.js TS Run_  
- _[SqLite3](https://www.npmjs.com/package/sqlite3)_    
- _[ESLint](https://eslint.org/) , with [ESLint Stylistic](https://eslint.style/)_
---  
### Routes:  
- `/posts`
  - `GET` - receive posts list  
  - `POST` - create a new post (JSON body `{ name: string, description: string}`)  
- `/posts/{id}`  
  - `GET` - get post by id  
  - `PUT` - update post  
  - `DELETE` - remove post by id from database