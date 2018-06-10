import { combineReducers } from 'redux';
import { reposReducers } from './repos.reducers';

const rootReducers = combineReducers({
  repos: reposReducers,
});

export default rootReducers;
