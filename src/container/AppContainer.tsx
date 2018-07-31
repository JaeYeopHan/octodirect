import React from 'react';
import { connect } from 'react-redux';

import { Input } from '../components/main-view/input/Input';
import { ItemList } from '../components/main-view/itemlist/ItemList';
import { Info } from '../components/main-view/info/Info';
import { RepoState } from '../reducers/repos.reducers';
import { actions } from '../actions/actions';
import { ViewState } from '../reducers/view.reducers';

interface AppContainerProps {
  repos: RepoState;
  view: ViewState;
  onPressUpKey: () => void;
  onPressDownKey: () => void;
  onChange: (value: string) => void;
  onClickButton: () => void;
}

class AppContainer extends React.Component<AppContainerProps> {
  render(): JSX.Element {
    const {
      repos,
      view,
      onPressUpKey,
      onPressDownKey,
      onChange,
      onClickButton,
    } = this.props;

    const MainView: JSX.Element = (
      <React.Fragment>
        <Input
          repos={repos}
          onPressUpKey={onPressUpKey}
          onPressDownKey={onPressDownKey}
          onChange={onChange}
        />
        <ItemList repos={repos} />
        <Info onClickButton={onClickButton} />
      </React.Fragment>
    );
    const SettingView: JSX.Element = <div>Setting view</div>;

    return view.type === 'main' ? MainView : SettingView;
  }
}

const mapStateToProps = (state: AppContainerProps) => ({
  repos: state.repos,
  view: state.view,
});

const mapDispatchToProps = (dispatch: any) => ({
  onPressUpKey: () => dispatch(actions.decrementIndex()),
  onPressDownKey: () => dispatch(actions.incrementIndex()),
  onChange: (value: string) => dispatch(actions.updateValue(value)),
  onClickButton: () => dispatch(actions.toggleView()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
