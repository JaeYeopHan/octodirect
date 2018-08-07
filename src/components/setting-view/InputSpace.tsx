import React, { Component } from 'react';
import styled from 'styled-components';
import {
  CloseIcon,
  // @ts-ignore
} from 'evergreen-ui';
import { UserInfo } from '../../service/userInfo.service';
import { UserInfoState } from '../../reducers/userInfo.reducers';
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
  userInfo: UserInfoState;
  onClickSubmit: (info: UserInfo) => void;
  onClickClose: () => void;
}

export class InputSpace extends Component<InputSpaceProps> {
  render(): JSX.Element {
    const { repos, userInfo, onClickSubmit, onClickClose } = this.props;
    return (
      <SettingViewLayout>
        <IconLayout>
          <CloseIcon onClick={onClickClose} />
        </IconLayout>
        <GitHubSetting
          repos={repos}
          userInfo={userInfo}
          onClickSubmit={onClickSubmit}
          onClickClose={onClickClose}
        />
        <Division />
        <BookmarkSetting
          repos={repos}
          userInfo={userInfo}
          onClickSubmit={onClickSubmit}
          onClickClose={onClickClose}
        />
      </SettingViewLayout>
    );
  }
}
