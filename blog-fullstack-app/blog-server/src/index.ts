import { Express } from 'express';
import { PORT } from './config/server';
import { configureApp } from './configureApp';
import { RouteConfig } from './config/routes';
import { userRouter } from './modules/user/user.route';
import { authRouter } from './modules/auth/auth.router';

const app: Express = await configureApp();

app.use(`/${RouteConfig.urlPrefix}/${RouteConfig.currentApiVersion}/users`, userRouter);
app.use(`/${RouteConfig.urlPrefix}/${RouteConfig.currentApiVersion}/auth`, authRouter);

app.listen(PORT, () => {
  console.log(`[server]: Blog-Server-App is running at http://localhost:${PORT}`);
});