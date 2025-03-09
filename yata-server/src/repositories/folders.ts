import { Injectable } from '@nestjs/common';
import { Db } from 'src/db/db';
import { ConfigService } from '../config/config.service';
import { Folder } from '../models/folder';

@Injectable()
export class FoldersRepository {
  private readonly db: Db;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.getConfig();
    this.db = Db.get(config);
  }

  async getFolders(): Promise<Folder[]> {
    const result = await this.db.db.all<FolderJoinedFolderTodos[]>(
      'SELECT * FROM folders join folder_todos on folders.id = folder_todos.folder_id',
    );

    const todosByFolderId = result.reduce((acc, curr) => {
      if (!acc[curr.folder_id]) {
        acc[curr.folder_id] = {
          todos: [curr.folder_id],
          name: curr.name,
        };
        return acc;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (acc[curr.folder_id]['todos'] as string[]).push(curr.todo_id);
      return acc;
    }, {});

    return Object.keys(todosByFolderId).map((folderId) => {
      return {
        id: folderId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        name: todosByFolderId[folderId]['name'] as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        todos: todosByFolderId[folderId]['todos'] as string[],
      };
    });
  }
}

type FolderJoinedFolderTodos = {
  id: string;
  name: string;
  folder_id: string;
  todo_id: string;
};
