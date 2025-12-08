import { ConfigService } from '@nestjs/config';
import dotenv from 'dotenv'

dotenv.config();


const NodeEnvKey = 'NODE_ENV';
const DevEnvValue = 'development';

export const isDev = (configService: ConfigService): boolean => {
  return configService.get(NodeEnvKey) === DevEnvValue;
};

export const IS_DEV = process.env[NodeEnvKey] === DevEnvValue; 