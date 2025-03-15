import express, { type Express } from 'express';
import fs from 'node:fs';
import cors from 'cors';
import { CORS_OPTIONS, UPLOADS_DIR_NAME } from './config/server';

export const configureApp = async (): Promise<Express> => {
  const app = express();

  app.use(cors(CORS_OPTIONS));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(`/${UPLOADS_DIR_NAME}`, express.static(UPLOADS_DIR_NAME));

  await createUploadsDir();

  return app;
};

const createUploadsDir = async (): Promise<void> => {
  try {
    await fs.promises.access(UPLOADS_DIR_NAME);
  } catch (error) {
    await fs.promises.mkdir(UPLOADS_DIR_NAME)
  }
};