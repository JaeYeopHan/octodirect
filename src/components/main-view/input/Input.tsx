import React from 'react';
import styled from 'styled-components';
import { KeyUtils } from '../../../utils/Key';
import { RepoState } from '../../../reducers/repos.reducers';

const StyledInput = styled.input`
  position: fixed;
  top: 8px;
  padding: 4px 12px;
  width: 240px;
  color: #cad5df;
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
  public render(): JSX.Element {
    const { value } = this.props.repos;

    return (
      <StyledInput
        placeholder={value ? value : 'Find a repository'}
        autoFocus={true}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
          this.handleKeyDown(event)
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          this.handleChange(event)
        }
      />
    );
  }

  private handleKeyDown({
    keyCode,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>): void {
    const { index, maxIndex, filtered } = this.props.repos;

    if (KeyUtils.isCorrectUpKey(keyCode, index)) {
      return this.props.onPressUpKey();
    }

    if (KeyUtils.isCorrectDownKey(keyCode, index, maxIndex)) {
      this.props.onPressDownKey();
      return;
    }

    if (KeyUtils.isCorrectEnterKey(keyCode, currentTarget.placeholder)) {
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

  private handleChange({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>): void {
    return this.props.onChange(currentTarget.value);
  }
}
