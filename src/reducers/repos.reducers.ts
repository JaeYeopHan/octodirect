import { ActionTypes, Actions } from '../actions/actions';
import { Reducer } from 'redux';
import { ItemType } from '../model/item.model';
import { RepositoryInfo } from '../service/githubRepository.service';
import { FetchResponseType } from '../saga/repos.saga';

export interface RepoState {
  list: ItemType[];
  filtered: ItemType[];
  index: number;
  maxIndex: number;
  value: string;
  fetchResponseType: FetchResponseType;
}

const initialState: RepoState = {
  list: [],
  filtered: [],
  index: 0,
  value: '',
  maxIndex: 0,
  fetchResponseType: FetchResponseType.FETCH_READY,
};

export const reposReducers: Reducer<Readonly<RepoState>> = (
  state: RepoState = initialState,
  action: Actions,
): RepoState => {
  switch (action.type) {
    case ActionTypes.FETCH_SUCCESS: {
      const { response, data } = action.payload;
      const list = refineData(data);

      return {
        ...state,
        list,
        filtered: list,
        maxIndex: list.length - 1,
        fetchResponseType: response,
      };
    }

    case ActionTypes.FETCH_FAIL: {
      return {
        ...state,
        list: [],
        fetchResponseType: FetchResponseType.UNKNOWN_ERROR,
      };
    }

    case ActionTypes.INCREMENT_INDEX: {
      const { index, list } = state;
      const changedIndex = index + 1;
      const selectedValue = list[changedIndex].name;

      return {
        ...state,
        index: changedIndex,
        value: selectedValue,
      };
    }

    case ActionTypes.DECREMENT_INDEX: {
      const { index, list } = state;
      const changedIndex = index - 1;
      const selectedValue = list[changedIndex].name;

      return {
        ...state,
        index: changedIndex,
        value: selectedValue,
      };
    }

    case ActionTypes.UPDATE_VALUE: {
      const value = action.payload;
      const filtered = filterList(state.list, value);

      return {
        ...state,
        value,
        filtered,
        index: 0,
        maxIndex: filtered.length - 1,
      };
    }

    default:
      return state;
  }
};

function filterList(repos: ItemType[], value: string): ItemType[] {
  if (value === '') {
    return repos;
  }
  return repos.filter((repo: ItemType) =>
    repo.name.toLowerCase().includes(value.toLowerCase()),
  );
}

function refineData(rawRepos: RepositoryInfo[]): ItemType[] {
  if (!rawRepos) {
    return [];
  }
  return rawRepos.map(({ id, name, url: htmlUrl }: RepositoryInfo) => ({
    id,
    name,
    htmlUrl,
  }));
}
