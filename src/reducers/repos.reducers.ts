import { ActionTypes, Actions } from './../actions/actions';
import { Reducer } from 'redux';
import { ItemType } from '../model/item.model';

export interface RepoState {
  list: ItemType[];
  filtered: ItemType[];
  index: number;
  maxIndex: number;
  value: string;
}

const initialState: RepoState = {
  list: [],
  filtered: [],
  index: 0,
  value: '',
  maxIndex: 0,
};

export const reposReducers: Reducer<Readonly<RepoState>> = (
  state: RepoState = initialState,
  action: Actions,
): RepoState => {
  switch (action.type) {
    case ActionTypes.FETCH_SUCCESS:
      const list = refineData(action.payload);

      return {
        ...state,
        list,
        filtered: list,
        maxIndex: list.length - 1,
      };

    case ActionTypes.FETCH_FAIL:
      return {
        ...state,
        list: [],
      };

    case ActionTypes.INCREMENT_INDEX:
      return {
        ...state,
        index: state.index + 1,
      };

    case ActionTypes.DECREMENT_INDEX:
      return {
        ...state,
        index: state.index - 1,
      };

    case ActionTypes.UPDATE_VALUE:
      const filtered = filterList(state.list, action.payload);

      return {
        ...state,
        value: action.payload,
        filtered,
        maxIndex: filtered.length - 1,
      };

    default:
      return state;
  }
};

function filterList(repos: ItemType[], value: string): ItemType[] {
  if (value === '') {
    return repos;
  }
  return repos.filter((repo: ItemType) => repo.name.includes(value));
}

function refineData(rawRepos: any[]): ItemType[] {
  if (!rawRepos) {
    return [];
  }
  return rawRepos.map(({ id, name, htmlUrl }: ItemType) => ({
    id,
    name,
    htmlUrl,
  }));
}
