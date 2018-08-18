import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { SettingView } from '../components/setting-view/SettingView';
import { RepoState } from '../reducers/repos.reducers';
import { SettingInfoState } from '../reducers/setting-info.reducers';
import { UserInfoInterface } from '../service/user-info.service';
import { actions } from '../actions/actions';

interface SettingContainerProps {
  repos: RepoState;
  settingInfo: SettingInfoState;
  toggleView: () => void;
  insertUserInfo: (userInfo: UserInfoInterface) => void;
  addDomainInfo: (domainInfo: string) => void;
}

class SettingContainer extends React.Component<SettingContainerProps> {
  @autobind
  handleClickSubmit(userInfo: UserInfoInterface) {
    this.props.insertUserInfo(userInfo);
  }

  @autobind
  handleClickClose() {
    this.props.toggleView();
  }

  @autobind
  handleKeyDown(value: string) {
    this.props.addDomainInfo(value);
  }

  render(): JSX.Element {
    return (
      <SettingView
        repos={this.props.repos}
        settingInfo={this.props.settingInfo}
        onClickSubmit={this.handleClickSubmit}
        onClickClose={this.handleClickClose}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

const mapStateToProps = (state: SettingContainerProps) => ({
  repos: state.repos,
  settingInfo: state.settingInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleView: () => dispatch(actions.toggleView()),
  insertUserInfo: (userInfo: UserInfoInterface) =>
    dispatch(actions.insertUserInfo(userInfo)),
  addDomainInfo: (domainInfo: string) =>
    dispatch(actions.insertDomainInfo(domainInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingContainer);
