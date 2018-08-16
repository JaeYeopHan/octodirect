import React, { Component } from 'react';
import styled from 'styled-components';
import {
  CloseIcon,
  // @ts-ignore
} from 'evergreen-ui';
import { UserInfoInterface } from '../../service/user-info.service';
import { SettingInfoState } from '../../reducers/setting-info.reducers';
import { RepoState } from '../../reducers/repos.reducers';
import { GitHubSetting } from './GitHubSetting';
import { BookmarkSetting } from './BookmarkSetting';

const SettingViewLayout = styled.div`
  position: relative;
  margin: 16px;
`;

const Division = styled.div`
  margin: 0px auto 20px auto;
  width: 48px;
  height: 20px;
  border-bottom: 1px dashed grey;
`;

const IconLayout = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
`;

interface InputSpaceProps {
  repos: RepoState;
  settingInfo: SettingInfoState;
  onClickSubmit: (info: UserInfoInterface) => void;
  onClickClose: () => void;
  addDomainInfo: (domainInfo: string) => void;
}

export class InputSpace extends Component<InputSpaceProps> {
  render(): JSX.Element {
    const {
      repos,
      settingInfo,
      onClickSubmit,
      onClickClose,
      addDomainInfo,
    } = this.props;
    return (
      <SettingViewLayout>
        <IconLayout>
          <CloseIcon onClick={onClickClose} />
        </IconLayout>
        <GitHubSetting
          repos={repos}
          settingInfo={settingInfo}
          onClickSubmit={onClickSubmit}
          onClickClose={onClickClose}
        />
        <Division />
        <BookmarkSetting
          repos={repos}
          settingInfo={settingInfo}
          onClickSubmit={onClickSubmit}
          onClickClose={onClickClose}
          addDomainInfo={addDomainInfo}
        />
      </SettingViewLayout>
    );
  }
}
