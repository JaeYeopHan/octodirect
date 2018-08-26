import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { SettingView } from '../components/setting-view/SettingView';
import { RepoState } from '../reducers/repos.reducers';
import { SettingInfoState } from '../reducers/setting-info.reducers';
import { UserInfoInterface } from '../service/user-info.service';
import { actions } from '../actions/actions';
import { Dispatch } from 'redux';

interface SettingContainerProps {
  repos: RepoState;
  settingInfo: SettingInfoState;
  toggleView: () => void;
  insertUserInfo: (userInfo: UserInfoInterface) => void;
  addDomainInfo: (domainInfo: string) => void;
  deleteDomainInfo: (domainInfo: string) => void;
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

  @autobind
  handleClickDelete(target: string) {
    this.props.deleteDomainInfo(target);
  }

  render(): JSX.Element {
    return (
      <SettingView
        repos={this.props.repos}
        settingInfo={this.props.settingInfo}
        onClickSubmit={this.handleClickSubmit}
        onClickClose={this.handleClickClose}
        onKeyDown={this.handleKeyDown}
        onClickDelete={this.handleClickDelete}
      />
    );
  }
}

const mapStateToProps = (state: SettingContainerProps) => ({
  repos: state.repos,
  settingInfo: state.settingInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleView: () => dispatch(actions.toggleView()),
  insertUserInfo: (userInfo: UserInfoInterface) =>
    dispatch(actions.insertUserInfo(userInfo)),
  addDomainInfo: (domainInfo: string) =>
    dispatch(actions.insertDomainInfo(domainInfo)),
  deleteDomainInfo: (domainInfo: string) =>
    dispatch(actions.deleteDomainInfo(domainInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingContainer);
