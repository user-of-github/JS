import { Express } from 'express';
import { PORT } from './config/server';
import { configureApp } from './configureApp';
import { RouteConfig } from './config/routes';
import { userRouter } from './modules/user/user.route';
import { authRouter } from './modules/auth/auth.router';
import { postRouter } from './modules/post/post.router';
import { likeRouter } from './modules/like/like.router';
import { commentRouter } from './modules/comment/comment.router';
import { followRouter } from './modules/follow/follow.router';


const baseUrl = `${RouteConfig.urlPrefix}/${RouteConfig.currentApiVersion}`;

const app: Express = await configureApp();

app.use(`/${baseUrl}/auth`, authRouter);
app.use(`/${baseUrl}/users`, userRouter);
app.use(`/${baseUrl}/posts`, postRouter);
app.use(`/${baseUrl}/likes`, likeRouter);
app.use(`/${baseUrl}/comments`, commentRouter);
app.use(`/${baseUrl}/follows`, followRouter);


app.listen(PORT, () => {
  console.log(`[server]: Blog-Server-App is running at http://localhost:${PORT}`);
});