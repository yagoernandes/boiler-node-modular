import { container } from 'tsyringe';
import loggerConfig from '../../configs/logger';
import LoggerProvider from './models/LoggerProvider';
import providers from './providers';

const Logger = providers.logger[loggerConfig.driver];

container.registerInstance<LoggerProvider>(
  'LoggerProvider',
  new Logger(loggerConfig.config[loggerConfig.driver]),
);
