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
    const { index, maxIndex } = this.props.repos;

    if (KeyUtils.isCorrectUpKey(keyCode, index)) {
      this.props.onPressUpKey();
    } else if (KeyUtils.isCorrectDownKey(keyCode, index, maxIndex)) {
      this.props.onPressDownKey();
    } else if (KeyUtils.isCorrectEnterKey(keyCode, currentTarget.value)) {
      console.log(currentTarget.value);
      currentTarget.value = '';
    }
  }

  handleChange({ currentTarget }: React.KeyboardEvent<HTMLInputElement>): void {
    this.props.onChange(currentTarget.value);
  }

  render(): JSX.Element {
    return (
      <StyledInput
        placeholder={'Find a repository'}
        autoFocus={true}
        onKeyDown={(e: any) => this.handleKeyDown(e)}
        onChange={(e: any) => this.handleChange(e)}
      />
    );
  }
}
