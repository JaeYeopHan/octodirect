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

interface InputSpaceState {
  name: string;
  token: string;
}

export class InputSpace extends Component<InputSpaceProps, InputSpaceState> {
  public state: InputSpaceState = {
    name: '',
    token: '',
  };

  public componentDidMount() {
    const { name, token } = this.props.userInfo.info;

    if (name !== '' && token !== '') {
      this.setState({ name: name as string, token: token as string });
    }
  }

  render() {
    const { onClickClose, repos, userInfo } = this.props;
    const { name: storageName, token: storageToken } = userInfo.info;
    const { name, token } = this.state;
    const { fetchResponseType } = repos;
    const isDone =
      fetchResponseType === FetchResponseType.SUCCESS &&
      storageName === name &&
      storageToken === token &&
      name !== '' &&
      token !== '';
    let ButtonSection;

    if (isDone) {
      ButtonSection = (
        <Button onClick={onClickClose} appearance="green">
          Done
        </Button>
      );
    } else {
      ButtonSection = (
        <Button onClick={() => this.handleSubmit()}>Submit</Button>
      );
    }

    return (
      <SettingViewLayout>
        <IconLayout>
          <CloseIcon onClick={onClickClose} />
        </IconLayout>
        <Head>
          <Heading>GitHub Setting</Heading>
        </Head>
        <TextInputField
          value={this.state.name}
          label="Account name"
          placeholder="owner'sname"
          inputHeight={32}
          data-id="name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            this.handleUpdateValue(event)
          }
        />
        <TextInputField
          value={this.state.token}
          label="Access token"
          description="Check, https://github.com/settings/tokens"
          placeholder="secret access token"
          inputHeight={32}
          data-id="token"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            this.handleUpdateValue(event)
          }
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
      toaster.success('Complete to connect!');
    } else {
      toaster.warning('Invalid input!');
    }
  }

  private handleUpdateValue({ target }: React.ChangeEvent<HTMLInputElement>) {
    const key = target.dataset.id as keyof InputSpaceState;
    const value = target.value;

    // @ts-ignore
    this.setState({ [key]: value });
  }
}
