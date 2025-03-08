import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Db } from '../db/db';

@Injectable()
export class TodosRepository {
  private readonly db: Db;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.getConfig();
    this.db = new Db(config);
  }
}
