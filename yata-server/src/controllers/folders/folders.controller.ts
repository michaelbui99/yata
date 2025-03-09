import { Controller, Get } from '@nestjs/common';
import { FoldersService } from '../../services/folders/folders.service';

@Controller('api/v1/folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  getAll() {
    return this.foldersService.getFolders();
  }
}
