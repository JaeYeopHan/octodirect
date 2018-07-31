import { Actions, ActionTypes } from './../actions/actions';
import { Reducer } from 'redux';

type ViewType = 'main' | 'setting';

interface ViewState {
  view: ViewType;
}

const initialState: ViewState = {
  view: 'main',
};

export const viewReducers: Reducer<Readonly<ViewState>> = (
  state: ViewState = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_VIEW:
      const currentViewType = state.view;
      const nextViewType = currentViewType === 'main' ? 'setting' : 'main';
      return { ...state, ...{ view: nextViewType } };
    default:
      return state;
  }
};
