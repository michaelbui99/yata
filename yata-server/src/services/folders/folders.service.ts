import { Injectable } from '@nestjs/common';
import { FoldersRepository } from '../../repositories/folders';
import { Folder } from '../../models/folder';

@Injectable()
export class FoldersService {
  constructor(private readonly foldersRepository: FoldersRepository) {}

  async getFolders(): Promise<Folder[]> {
    return this.foldersRepository.getFolders();
  }
}
