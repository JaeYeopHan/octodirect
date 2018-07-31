import React from 'react';
import {
  Heading,
  Button,
  TextInputField,
  CloseIcon,
  // @ts-ignore
} from 'evergreen-ui';
import styled from 'styled-components';

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
  onClickSubmit: () => void;
}

export const InputSpace: React.SFC<InputSpaceProps> = ({ onClickSubmit }) => (
  <SettingViewLayout>
    <IconLayout>
      <CloseIcon onClick={onClickSubmit} />
    </IconLayout>
    <Head>
      <Heading>Setting</Heading>
    </Head>
    <TextInputField
      label="GitHub account"
      placeholder="owner'sname"
      inputHeight={32}
    />
    <TextInputField
      label="GitHub access token"
      description="Refer https://github.com/settings/tokens"
      placeholder="secret access token"
      inputHeight={32}
    />
    <Center>
      <Button onClick={onClickSubmit}>Submit</Button>
    </Center>
  </SettingViewLayout>
);
