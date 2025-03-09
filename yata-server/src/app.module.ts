import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos/todos.controller';
import { ConfigService } from './config/config.service';
import { TodosRepository } from './repositories/todos';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TodosService } from './services/todos/todos.service';
import { FoldersService } from './services/folders/folders.service';
import { FoldersController } from './controllers/folders/folders.controller';

import * as path from 'path';
import { FoldersRepository } from './repositories/folders';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'yata-client', 'browser'),
    }),
  ],
  controllers: [TodosController, FoldersController],
  providers: [
    ConfigService,
    TodosRepository,
    TodosService,
    FoldersService,
    FoldersRepository,
  ],
})
export class AppModule {}
