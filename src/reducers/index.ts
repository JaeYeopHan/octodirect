import { combineReducers } from 'redux';
import { repoReducers } from './repoReducers';

const rootReducers = combineReducers({
  repos: repoReducers,
});

export default rootReducers;
