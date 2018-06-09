import { FETCH_SUCCESS, FETCH_FAIL } from './../actions/repoAction';
import { Reducer } from 'redux';
import { ItemType } from '../model/item.model';

interface RepoState {
  list: ItemType[];
}

const initialState = {
  list: [],
};

export const repoReducers: Reducer<RepoState> = (
  state: RepoState = initialState,
  action,
): RepoState => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        list: refineData(action.repos),
      };
    case FETCH_FAIL:
      return {
        ...state,
        list: [],
      };

    default:
      return state;
  }
};

function refineData(rawRepos: any[]) {
  return rawRepos.map(({ id, name, htmlUrl }: ItemType) => ({
    id,
    name,
    htmlUrl,
  }));
}
