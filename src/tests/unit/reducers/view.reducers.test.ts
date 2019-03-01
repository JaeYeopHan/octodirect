import { actions } from '../../../actions/actions';
import { viewReducers, ViewState } from '../../../reducers/view.reducers';

describe('/reducers/view.reducers', () => {
  function getInitialState(viewType: any): ViewState {
    return {
      type: viewType,
    };
  }

  it('toggleView(), main to setting', () => {
    // Given
    const state = getInitialState('main');
    const toggleView = actions.toggleView();

    // When
    const result = viewReducers(state, toggleView);

    // Then
    const expected = {
      type: 'setting',
    };
    expect(result).toEqual(expected);
  });

  it('toggleView(), setting to main', () => {
    // Given
    const state = getInitialState('setting');
    const toggleView = actions.toggleView();

    // When
    const result = viewReducers(state, toggleView);

    // Then
    const expected = {
      type: 'main',
    };
    expect(result).toEqual(expected);
  });
});
