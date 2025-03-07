import {createActionGroup, props} from '@ngrx/store';

export const TodosActions = createActionGroup({
  source: "Todos",
  events: {
    'Get Todos': props<{ folderId?: string, tag?: string }>()
  }
});
