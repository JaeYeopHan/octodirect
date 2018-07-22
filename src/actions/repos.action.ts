import { createAction } from './createAction';

/**
 * Fetch repository actions
 */
export const FETCH_REPOS_REQUEST: string = 'FETCH_REPOS_REQUEST';
export const FETCH_SUCCESS: string = 'FETCH_SUCCESS';
export const FETCH_FAIL: string = 'FETCH_FAIL';

export const fetchReposRequest = createAction(FETCH_REPOS_REQUEST);

/**
 * Index actions
 */
export const INDEX_UP: string = 'INDEX_UP';
export const INDEX_DOWN: string = 'INDEX_DOWN';

export const upIndex = createAction(INDEX_UP);
export const downIndex = createAction(INDEX_DOWN);

/**
 * Value actions
 */
export const enum VALUE {
  UPDATE = 'UPDATE',
}

export const updateValue = createAction(VALUE.UPDATE);
