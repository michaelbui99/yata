import {Component, Input, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import {FoldersService} from '../../services/folders.service';
import {Folder} from '../../models/folder';
import {DividerModule} from 'primeng/divider';
import {Tag} from '../../models/tag';
import {TagsService} from '../../services/tags.service';
import {PrimeIcons} from 'primeng/api';
import {RouterLink} from '@angular/router';
import {from, lastValueFrom} from 'rxjs';

@Component({
  selector: 'yata-sidemenu',
  imports: [PanelMenuModule, DividerModule, RouterLink],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {
  @Input()
  title: string = "";
  private readonly FOLDERS_ID = "YATA_FOLDERS";
  mainMenuItems: WritableSignal<MenuItem[]> = signal([]);
  tagsMenuItems: WritableSignal<MenuItem[]> = signal([]);

  constructor(private readonly folderService: FoldersService, private readonly tagsService: TagsService) {
  }

  async ngOnInit(): Promise<void> {
    this.mainMenuItems.set([
      {
        id: "YATA_ALL_TODOS",
        label: "TODOs",
        icon: PrimeIcons.LIST,
        routerLink: ["todos"],
        queryParams: {},
        queryParamsHandling: "replace"
      },
      {
        id: "YATA_CALENDAR",
        label: "Calendar",
        icon: PrimeIcons.CALENDAR,
        routerLink: ["calendar"],
      },
      {
        id: this.FOLDERS_ID,
        label: "Folders",
        icon: PrimeIcons.FOLDER,
        items: []
      }
    ]);

    this.tagsMenuItems.set([])

    this.fetchFolders();
    this.fetchTags();
  }

  private async fetchFolders(): Promise<void> {
    const folders = await lastValueFrom(this.folderService.getFolders());
    this.mainMenuItems.update(items => items.map(item => {
      if (item.id && item.id === this.FOLDERS_ID) {
        return {
          ...item,
          ...{
            items: this.foldersToMenuItems(folders.filter(f => f.name !== "today"))
          }
        }
      }
      return item;
    }));
  }

  private fetchTags() {
    from(this.tagsService.getTags()).subscribe({
      next: tags => {
        this.tagsMenuItems.set(this.tagsToMenuItems(tags));
      }
    })
  }

  private foldersToMenuItems(folders: Folder[]): MenuItem[] {
    return folders.map(folder => {
      return {
        id: `YATA_FOLDER:${folder.id}`,
        label: folder.name,
        icon: PrimeIcons.BARS,
        routerLink: ["todos"],
        queryParams: {
          folder: folder.id
        },
        queryParamsHandling: "merge"
      }
    });
  }

  private tagsToMenuItems(tags: Tag[]): MenuItem[] {
    return tags.map(tag => {
      return {
        id: `YATA_TAG:${tag.name}`,
        label: tag.name,
        icon: PrimeIcons.HASHTAG,
        style: {
          color: tag.color
        },
        routerLink: ["todos"],
        queryParams: {
          tag: tag.name
        },
        queryParamsHandling: "merge"
      }
    });
  }
}
