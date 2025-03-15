import { Express } from 'express';
import { PORT } from './config/server';
import { configureApp } from './configureApp';
import { CURRENT_API_VERSION, URL_PREFIX } from './config/routes';
import { userRouter } from './modules/user/user.route';
import { authRouter } from './modules/auth/auth.router';

const app: Express = await configureApp();

app.use(`/${URL_PREFIX}/${CURRENT_API_VERSION}/users`, userRouter);
app.use(`/${URL_PREFIX}/${CURRENT_API_VERSION}/auth`, authRouter);

app.listen(PORT, () => {
  console.log(`[server]: Blog-Server-App is running at http://localhost:${PORT}`);
});