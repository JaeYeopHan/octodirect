import React, { Component } from 'react';
import styled from 'styled-components';
import {
  CloseIcon,
  SegmentedControl,
  // @ts-ignore
} from 'evergreen-ui';

import { Head } from './common/Head';
import { UserInfoInterface } from '../../service/user-info.service';
import { SettingInfoState } from '../../reducers/setting-info.reducers';
import { RepoState } from '../../reducers/repos.reducers';
import { GitHubSetting } from './GitHubSetting';
import { DomainSetting } from './DomainSetting';

const SettingViewLayout = styled.div`
  position: relative;
  margin: 16px;
`;

const IconLayout = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
`;

const ControllerLayout = styled.div`
  margin-bottom: 12px;
`;

interface SettingViewProps {
  repos: RepoState;
  settingInfo: SettingInfoState;
  onClickSubmit: (info: UserInfoInterface) => void;
  onClickClose: () => void;
  onKeyDown: (domainInfo: string) => void;
}

interface ViewOption {
  label: string;
  value: string;
}

interface SettingViewState {
  options: ViewOption[];
  viewType: string;
}

export class SettingView extends Component<SettingViewProps, SettingViewState> {
  state = {
    options: [
      { label: 'GitHub', value: 'github' },
      { label: 'Domain', value: 'domain' },
    ],
    viewType: 'github',
  };

  handleChangeViewType(selected: string) {
    this.setState({
      viewType: selected,
    });
  }

  render(): JSX.Element {
    const {
      repos,
      settingInfo,
      onClickSubmit,
      onClickClose,
      onKeyDown,
    } = this.props;

    const { options, viewType } = this.state;

    const GitHubSettingView = (
      <GitHubSetting
        repos={repos}
        settingInfo={settingInfo}
        onClickSubmit={onClickSubmit}
        onClickClose={onClickClose}
      />
    );

    const DomainSettingView = (
      <DomainSetting
        repos={repos}
        settingInfo={settingInfo}
        onClickSubmit={onClickSubmit}
        onClickClose={onClickClose}
        onKeyDown={onKeyDown}
      />
    );

    return (
      <SettingViewLayout>
        <Head content={'Octodirect Setting'} />
        <IconLayout>
          <CloseIcon onClick={onClickClose} />
        </IconLayout>
        <ControllerLayout>
          <SegmentedControl
            width={'100%'}
            height={30}
            name={'setting-option'}
            options={options}
            value={viewType}
            defaultValue={'github'}
            onChange={(selected: string) => this.handleChangeViewType(selected)}
          />
        </ControllerLayout>
        {viewType === 'github' ? GitHubSettingView : DomainSettingView}
      </SettingViewLayout>
    );
  }
}
