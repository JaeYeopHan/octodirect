import { createAction } from '.';
/**
 * Action Type
 */
export const FETCH_REPOS_REQUEST: string = 'FETCH_REPOS_REQUEST';
export const FETCH_SUCCESS: string = 'FETCH_SUCCESS';
export const FETCH_FAIL: string = 'FETCH_FAIL';

/**
 * Action creator
 */
export const fetchReposRequest = createAction(FETCH_REPOS_REQUEST);
