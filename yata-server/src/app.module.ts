import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos/todos.controller';
import { ConfigService } from './config/config.service';
import { TodosRepository } from './repositories/todos';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'yata-client', 'browser'),
    }),
  ],
  controllers: [TodosController],
  providers: [ConfigService, TodosRepository],
})
export class AppModule {}
