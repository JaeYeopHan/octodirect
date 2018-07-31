import React from 'react';
import { connect } from 'react-redux';

import { Input } from '../components/main-view/input/Input';
import { ItemList } from '../components/main-view/itemlist/ItemList';
import { Info } from '../components/main-view/info/Info';
import { InputSpace } from '../components/setting-view/InputSpace';
import { RepoState } from '../reducers/repos.reducers';
import { actions } from '../actions/actions';
import { ViewState } from '../reducers/view.reducers';
import { UserInfo } from '../service/userInfo.service';

interface AppContainerProps {
  repos: RepoState;
  view: ViewState;
  onPressUpKey: () => void;
  onPressDownKey: () => void;
  onChange: (value: string) => void;
  onToggleView: () => void;
  onClickSubmit: (info: UserInfo) => void;
}

class AppContainer extends React.Component<AppContainerProps> {
  render(): JSX.Element {
    const {
      repos,
      view,
      onPressUpKey,
      onPressDownKey,
      onChange,
      onToggleView,
      onClickSubmit,
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
        <Info onToggleView={onToggleView} />
      </React.Fragment>
    );

    const SettingView: JSX.Element = (
      <InputSpace onClickSubmit={onClickSubmit} onClickClose={onToggleView} />
    );

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
  onToggleView: () => dispatch(actions.toggleView()),
  onClickSubmit: (info: UserInfo) => dispatch(actions.insertUserInfo(info)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
