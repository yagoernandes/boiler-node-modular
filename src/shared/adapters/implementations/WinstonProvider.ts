import { createLogger, LoggerOptions, Logger } from 'winston';

import LoggerProvider from '../models/LoggerProvider';

class WinstonProvider implements LoggerProvider {
  private logger: Logger;

  constructor(config: LoggerOptions) {
    this.logger = createLogger(config);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  log(level: string, message: string, metadata: object): void {
    this.logger.log(level, message, { metadata });
  }
}

export default WinstonProvider;
