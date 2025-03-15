import { Express } from 'express';
import { PORT } from './config/server';
import { configureApp } from './configureApp';

const app: Express = await configureApp();

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});