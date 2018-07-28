import React from 'react';
import styled from 'styled-components';
import { KeyUtils } from '../../utils/Key';
import { RepoState } from '../../reducers/repos.reducers';

const StyledInput = styled.input`
  position: fixed;
  top: 8px;
  padding: 4px 12px;
  width: 240px;
  color: #282828;
  font-size: 16px;
  border: none;
  ::placeholder {
    color: grey;
  }
`;

interface InputProps {
  repos: RepoState;
  onPressUpKey: () => void;
  onPressDownKey: () => void;
  onChange: (value: string) => void;
}

export class Input extends React.Component<InputProps> {
  handleKeyDown({
    keyCode,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>): void {
    const { index, maxIndex, filtered } = this.props.repos;

    if (KeyUtils.isCorrectUpKey(keyCode, index)) {
      this.props.onPressUpKey();
    } else if (KeyUtils.isCorrectDownKey(keyCode, index, maxIndex)) {
      this.props.onPressDownKey();
    } else if (KeyUtils.isCorrectEnterKey(keyCode, currentTarget.placeholder)) {
      const selectedItem = filtered[index];
      const targetUrl = selectedItem.htmlUrl;

      if (process.env.NODE_ENV === 'development') {
        console.log(targetUrl);
      } else {
        chrome.tabs.create({ url: targetUrl });
        currentTarget.placeholder = '';
        setTimeout(() => window.close, 300);
      }
    }
  }

  handleChange({ currentTarget }: React.KeyboardEvent<HTMLInputElement>): void {
    this.props.onChange(currentTarget.value);
  }

  render(): JSX.Element {
    const { value } = this.props.repos;

    return (
      <StyledInput
        placeholder={value ? value : 'Find a repository'}
        autoFocus={true}
        onKeyDown={(e: any) => this.handleKeyDown(e)}
        onChange={(e: any) => this.handleChange(e)}
      />
    );
  }
}
