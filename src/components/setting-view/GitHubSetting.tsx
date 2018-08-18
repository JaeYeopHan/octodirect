import React, { Component, Fragment } from 'react';
import {
  Button,
  TextInputField,
  toaster,
  // @ts-ignore
} from 'evergreen-ui';
import styled from 'styled-components';
import { UserInfoInterface } from '../../service/user-info.service';
import { SettingInfoState } from '../../reducers/setting-info.reducers';
import { RepoState } from '../../reducers/repos.reducers';
import { FetchResponseType } from '../../saga/repos.saga';

const Center = styled.div`
  text-align: center;
`;

interface GitHubSettingProps {
  repos: RepoState;
  settingInfo: SettingInfoState;
  onClickSubmit: (info: UserInfoInterface) => void;
  onClickClose: () => void;
}

interface GitHubSettingState {
  name: string;
  token: string;
}

export class GitHubSetting extends Component<
  GitHubSettingProps,
  GitHubSettingState
> {
  public state: GitHubSettingState = {
    name: '',
    token: '',
  };

  componentDidMount() {
    const { name, token } = this.props.settingInfo.userInfo;

    if (name !== '' && token !== '') {
      this.setState({ name: name as string, token: token as string });
    }
  }

  render() {
    const { onClickClose, repos, settingInfo } = this.props;
    const { name: storageName, token: storageToken } = settingInfo.userInfo;
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
      <Fragment>
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
      </Fragment>
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
    const key = target.dataset.id as keyof GitHubSettingState;
    const value = target.value;

    // @ts-ignore
    this.setState({ [key]: value });
  }
}
