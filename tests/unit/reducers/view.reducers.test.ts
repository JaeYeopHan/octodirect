import { viewReducers, ViewState } from '../../../src/reducers/view.reducers';
import { actions } from '../../../src/actions/actions';

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
    const expected = {
      type: 'setting',
    };

    // Then
    expect(result).toEqual(expected);
  });

  it('toggleView(), setting to main', () => {
    // Given
    const state = getInitialState('setting');
    const toggleView = actions.toggleView();

    // When
    const result = viewReducers(state, toggleView);
    const expected = {
      type: 'main',
    };

    // Then
    expect(result).toEqual(expected);
  });
});
