import express, { Express } from 'express';
import { DEFAULT_PORT } from './constants/server';
import { CURRENT_API_VERSION, URL_PREFIX } from './constants/routes';
import { UserRouter } from './routes/users';


const app: Express = express();
const port = process.env.PORT || DEFAULT_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(`/${URL_PREFIX}/${CURRENT_API_VERSION}/users`, UserRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});