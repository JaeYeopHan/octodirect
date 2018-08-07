import React, { Component, Fragment } from 'react';
import {
  TextInputField,
  AddIcon,
  // @ts-ignore
} from 'evergreen-ui';
import styled from 'styled-components';
import { UserInfo } from '../../service/userInfo.service';
import { UserInfoState } from '../../reducers/userInfo.reducers';
import { RepoState } from '../../reducers/repos.reducers';
import { Head } from './common/Head';

const FieldLayout = styled.div`
  height: 100%;
`;

const IconLayout = styled.span`
  position: absolute;
  right: 0px;
  bottom: 24px;
`;

interface BookmarkSettingProps {
  repos: RepoState;
  userInfo: UserInfoState;
  onClickSubmit: (info: UserInfo) => void;
  onClickClose: () => void;
}

export class BookmarkSetting extends Component<BookmarkSettingProps> {
  componentDidMount() {
    console.log(`componentDidMount`);
  }

  render() {
    return (
      <Fragment>
        <Head content={'Bookmark Setting'} />
        <FieldLayout>
          <TextInputField
            label="Filtering domain"
            placeholder="https://**"
            inputHeight={32}
            inputWidth={'calc(100% - 36px)'}
            data-id="domain"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              console.log(`hi`)
            }
          />
          <IconLayout>
            <AddIcon />
          </IconLayout>
        </FieldLayout>
      </Fragment>
    );
  }
}
