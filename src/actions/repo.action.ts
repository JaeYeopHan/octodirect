import { createAction } from '.';
import { FETCH_REPOS_REQUEST, INDEX_UP, INDEX_DOWN } from './actionTypes';

export const fetchReposRequest = createAction(FETCH_REPOS_REQUEST);
export const upIndex = createAction(INDEX_UP);
export const downIndex = createAction(INDEX_DOWN);
