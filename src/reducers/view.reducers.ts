import { Actions, ActionTypes } from '../actions/actions'
import { Reducer } from 'redux'

type ViewType = 'main' | 'setting'

export interface ViewState {
  type: ViewType
}

const initialState: ViewState = {
  type: 'main',
}

export const viewReducers: Reducer<Readonly<ViewState>> = (
  state: ViewState = initialState,
  action: Actions,
) => {
  // tslint:disable-next-line:no-small-switch
  switch (action.type) {
    case ActionTypes.TOGGLE_VIEW:
      const currentViewType = state.type
      const nextViewType = convertViewType(currentViewType)

      return { ...state, ...{ type: nextViewType } }
    default:
      return state
  }
}

function convertViewType(currentViewType: string): ViewType {
  return currentViewType === 'main' ? 'setting' : 'main'
}
