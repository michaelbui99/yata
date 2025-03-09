import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT ?? 8080;
  await app.listen(port);
  await createClientConfig(app);
}

async function createClientConfig(app: INestApplication<any>) {
  const clientConfig = {
    serverUrl: await app.getUrl(),
  };
  const clientPath = path.resolve(__dirname, 'yata-client', 'browser');
  fs.writeFileSync(
    path.resolve(clientPath, 'config.json'),
    JSON.stringify(clientConfig),
    {
      encoding: 'utf-8',
    },
  );
}

bootstrap();
