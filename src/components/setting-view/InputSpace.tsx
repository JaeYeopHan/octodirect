import React, { Component } from 'react';
import {
  Heading,
  Button,
  TextInputField,
  CloseIcon,
  // @ts-ignore
} from 'evergreen-ui';
import styled from 'styled-components';
import { UserInfo } from '../../service/userInfo.service';
import { UserInfoState } from '../../reducers/userInfo.reducers';

const SettingViewLayout = styled.div`
  margin: 16px;
`;

const Center = styled.div`
  text-align: center;
`;

const Head = styled.div`
  margin-bottom: 12px;
`;

const IconLayout = styled.div`
  float: right;
`;

interface InputSpaceProps {
  userInfo: UserInfoState;
  onClickSubmit: (info: UserInfo) => void;
  onClickClose: () => void;
  // getUserInfo: () => void;
}

export class InputSpace extends Component<InputSpaceProps> {
  state = {
    name: '',
    token: '',
  };

  componentDidMount() {
    const userInfo = this.props.userInfo.info;

    if (userInfo.name !== '' && userInfo.token !== '') {
      this.setState({
        name: userInfo.name,
        token: userInfo.token,
      });
    }
  }

  handleSubmit() {
    const { onClickSubmit } = this.props;
    const { name, token } = this.state;

    if (name !== '' && token !== '') {
      onClickSubmit({ name, token });
    }
  }

  handleUpdateValue(e: any) {
    const target = e.target;
    const key = target.dataset.id;
    const value = target.value;

    this.setState({
      [key]: value,
    });
  }

  render() {
    const { onClickClose } = this.props;

    return (
      <SettingViewLayout>
        <IconLayout>
          <CloseIcon onClick={onClickClose} />
        </IconLayout>
        <Head>
          <Heading>Setting</Heading>
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
        <Center>
          <Button onClick={() => this.handleSubmit()}>Submit</Button>
        </Center>
      </SettingViewLayout>
    );
  }
}
