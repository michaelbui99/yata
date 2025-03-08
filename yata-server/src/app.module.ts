import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './controllers/todos/todos.controller';
import { ConfigService } from './config/config.service';
import { TodosRepository } from './repositories/todos';

@Module({
  imports: [],
  controllers: [AppController, TodosController],
  providers: [AppService, ConfigService, TodosRepository],
})
export class AppModule {}
