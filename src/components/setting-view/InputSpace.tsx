import React from 'react';
// @ts-ignore
import { Heading, Button, TextInput, TextInputField } from 'evergreen-ui';
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

interface InputSpaceProps {
  onClickSubmit: () => void;
}

export const InputSpace: React.SFC<InputSpaceProps> = ({ onClickSubmit }) => (
  <SettingViewLayout>
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
