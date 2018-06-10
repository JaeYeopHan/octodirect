import { Reducer } from 'redux';
import { ItemType } from '../model/item.model';
import {
  FETCH_SUCCESS,
  FETCH_FAIL,
  INDEX_UP,
  INDEX_DOWN,
} from '../actions/actionTypes';

interface RepoState {
  list: ItemType[];
  index: number;
}

const initialState = {
  list: [],
  index: 0,
};

export const reposReducers: Reducer<RepoState> = (
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

    case INDEX_UP:
      return {
        ...state,
        index: state.index + 1,
      };
    case INDEX_DOWN:
      return {
        ...state,
        index: state.index - 1,
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
