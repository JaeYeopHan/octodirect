import React, { Component } from 'react';
import {
  Heading,
  Button,
  TextInputField,
  CloseIcon,
  toaster,
  // @ts-ignore
} from 'evergreen-ui';
import styled from 'styled-components';
import { UserInfo } from '../../service/userInfo.service';
import { UserInfoState } from '../../reducers/userInfo.reducers';
import { RepoState } from '../../reducers/repos.reducers';
import { FetchResponseType } from '../../saga/repos.saga';

const SettingViewLayout = styled.div`
  position: relative;
  margin: 16px;
`;

const Center = styled.div`
  text-align: center;
`;

const Head = styled.div`
  margin-bottom: 12px;
  height: 100%;
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
  public state = {
    name: '',
    token: '',
  };

  public componentDidMount() {
    const userInfo = this.props.userInfo.info;

    if (userInfo.name !== '' && userInfo.token !== '') {
      this.setState({
        name: userInfo.name,
        token: userInfo.token,
      });
    }
  }

  render() {
    const { onClickClose, repos, userInfo } = this.props;
    const { name: storageName, token: storageToken } = userInfo.info;
    const { name, token } = this.state;
    const { fetchResponseType } = repos;
    let ButtonSection;

    if (
      fetchResponseType === FetchResponseType.SUCCESS &&
      storageName === name &&
      storageToken === token
    ) {
      ButtonSection = (
        <Button onClick={onClickClose} appearance="green">
          Done
        </Button>
      );
    } else {
      ButtonSection = (
        <Button
          onClick={() => {
            this.handleSubmit();
            toaster.success('Complete to connect!');
          }}
        >
          Submit
        </Button>
      );
    }

    return (
      <SettingViewLayout>
        <IconLayout>
          <CloseIcon onClick={onClickClose} />
        </IconLayout>
        <Head>
          <Heading padding-top={8}>Setting</Heading>
        </Head>
        <TextInputField
          value={this.state.name}
          label="GitHub account"
          placeholder="owner'sname"
          inputHeight={32}
          data-id="name"
          onChange={(e: any) => this.handleUpdateValue(e)}
        />
        <TextInputField
          value={this.state.token}
          label="GitHub access token"
          description="Refer https://github.com/settings/tokens"
          placeholder="secret access token"
          inputHeight={32}
          data-id="token"
          onChange={(e: any) => this.handleUpdateValue(e)}
        />
        <Center>{ButtonSection}</Center>
      </SettingViewLayout>
    );
  }

  private handleSubmit() {
    const { onClickSubmit } = this.props;
    const { name, token } = this.state;

    if (name !== '' && token !== '') {
      onClickSubmit({ name, token });
    }
  }

  private handleUpdateValue(e: any) {
    const target = e.target;
    const key = target.dataset.id;
    const value = target.value;

    this.setState({
      [key]: value,
    });
  }
}
