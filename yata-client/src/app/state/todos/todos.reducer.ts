import {Todo} from '../../models/todo';
import {createReducer, on} from '@ngrx/store';
import {TodosActions} from './todos.actions';

export const initialState: ReadonlyArray<Todo> = [];

export const TodosReducer = createReducer(initialState
)
