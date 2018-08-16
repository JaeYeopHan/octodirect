import React from 'react';
import { connect } from 'react-redux';

import { Input } from '../components/main-view/input/Input';
import { ItemList } from '../components/main-view/itemlist/ItemList';
import { Info } from '../components/main-view/info/Info';
import { InputSpace } from '../components/setting-view/InputSpace';
import { RepoState } from '../reducers/repos.reducers';
import { actions } from '../actions/actions';
import { ViewState } from '../reducers/view.reducers';
import { UserInfoInterface } from '../service/user-info.service';
import { SettingInfoState } from '../reducers/setting-info.reducers';

interface AppContainerProps {
  repos: RepoState;
  view: ViewState;
  settingInfo: SettingInfoState;
  onRefresh: () => void;
  onPressUpKey: () => void;
  onPressDownKey: () => void;
  onChange: (value: string) => void;
  onToggleView: () => void;
  onClickSubmit: (userInfo: UserInfoInterface) => void;
  addDomainInfo: (domainInfo: string) => void;
}

class AppContainer extends React.Component<AppContainerProps> {
  render(): JSX.Element {
    const {
      repos,
      view,
      settingInfo,
      onPressUpKey,
      onPressDownKey,
      onChange,
      onToggleView,
      onClickSubmit,
      addDomainInfo,
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
      <InputSpace
        repos={repos}
        settingInfo={settingInfo}
        onClickSubmit={onClickSubmit}
        onClickClose={onToggleView}
        addDomainInfo={addDomainInfo}
      />
    );

    return view.type === 'main' ? MainView : SettingView;
  }
}

const mapStateToProps = (state: AppContainerProps) => ({
  repos: state.repos,
  view: state.view,
  settingInfo: state.settingInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  onRefresh: () => dispatch(actions.fetchRequest()),
  onPressUpKey: () => dispatch(actions.decrementIndex()),
  onPressDownKey: () => dispatch(actions.incrementIndex()),
  onChange: (value: string) => dispatch(actions.updateValue(value)),
  onToggleView: () => dispatch(actions.toggleView()),
  onClickSubmit: (userInfo: UserInfoInterface) =>
    dispatch(actions.insertUserInfo(userInfo)),
  addDomainInfo: (domainInfo: string) =>
    dispatch(actions.insertDomainInfo(domainInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
