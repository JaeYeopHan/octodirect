import { Action, Reducer } from 'redux';

interface RepoState {
  list: string[];
}
const initialState = {
  list: []
};

export const repoReducers: Reducer<RepoState> = (
  state: RepoState = initialState,
  action: Action
) => {
  return state;
};
