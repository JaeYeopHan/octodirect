import { settingInfoReducers } from './setting-info.reducers'
import { combineReducers } from 'redux'
import { reposReducers } from './repos.reducers'
import { viewReducers } from './view.reducers'

const rootReducers = combineReducers({
  repos: reposReducers,
  view: viewReducers,
  settingInfo: settingInfoReducers,
})

export default rootReducers
