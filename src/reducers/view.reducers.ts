import { Actions, ActionTypes } from './../actions/actions';
import { Reducer } from 'redux';

type ViewType = 'main' | 'setting';

export interface ViewState {
  type: ViewType;
}

const initialState: ViewState = {
  type: 'main',
};

export const viewReducers: Reducer<Readonly<ViewState>> = (
  state: ViewState = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_VIEW:
      const currentViewType = state.type;
      const nextViewType = currentViewType === 'main' ? 'setting' : 'main';
      return { ...state, ...{ type: nextViewType } };
    default:
      return state;
  }
};
