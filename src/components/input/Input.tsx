/* tslint:disable: no-any */
import * as React from 'react';
import styled from 'styled-components';
import { KeyUtils } from '../../utils/Key';

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
  placeholder: string;
  index: number;
  maxIndex: number;
  updateState: (index: number) => void;
  updateValue: (text: string) => void;
  redirect: () => void;
}

class Input extends React.Component<InputProps> {
  handleKeyDown({keyCode, target}: any) {
    const { index, maxIndex, updateState, redirect } = this.props;

    if (KeyUtils.isCorrectUpKey(keyCode, index)) {// up
      updateState(index - 1);
      target.value = '';
    } else if (KeyUtils.isCorrectDownKey(keyCode, index, maxIndex)) {// down
      updateState(index + 1);
      target.value = '';
    } else if (KeyUtils.isCorrectEnterKey(keyCode, target.value)) {
      target.value = '';
      redirect();
    }
  }

  handleChange(e: any) {
    this.props.updateValue(e.target.value);
  }

  render() {
    return(
      <StyledInput
        placeholder={this.props.placeholder}
        autoFocus={true}
        onKeyDown={(e: any) => this.handleKeyDown(e)}
        onChange={(e: any) => this.handleChange(e)}
      />
    );
  }
}

export default Input;
