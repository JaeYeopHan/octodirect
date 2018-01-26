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
  upIndex: (index: number) => void;
  downIndex: (index: number) => void;
  updateValue: (text: string) => void;
  redirect: () => void;
}

class Input extends React.Component<InputProps> {
  // tslint:disable-next-line:no-any
  handleKeyDown({keyCode, target}: any) {
    const { index, maxIndex, upIndex, downIndex, redirect } = this.props;
    
    if (KeyUtils.isCorrectUpKey(keyCode, index)) {// up
      downIndex(index);
      target.value = '';
    } else if (KeyUtils.isCorrectDownKey(keyCode, index, maxIndex)) {// down
      upIndex(index);
      target.value = '';
    } else if (KeyUtils.isCorrectEnterKey(keyCode, target.value)) {
      target.value = '';
      redirect();
    }
  }

  // tslint:disable-next-line:no-any
  handleChange({target}: any) {
    this.props.updateValue(target.value);
  }

  render() {
    return(
      <StyledInput
        placeholder={this.props.placeholder}
        autoFocus={true}
        // tslint:disable-next-line:no-any
        onKeyDown={(e: any) => this.handleKeyDown(e)}
        // tslint:disable-next-line:no-any
        onChange={(e: any) => this.handleChange(e)}
      />
    );
  }
}

export default Input;
