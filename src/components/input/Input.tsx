import * as React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  position: fixed;
  top: 8px;
  padding: 4px 12px;
  width: 100%;
  color: #282828;
  font-size: 16px;
  border: none;
  ::placeholder {
    color: grey;
  }
`;

enum KEY {
  ENTER = 13,
  UP = 38,
  DOWN = 40,
}

interface InputProps {
  placeholder: string;
  index: number;
  maxIndex: number;
  upIndex: (index: number) => void;
  downIndex: (index: number) => void;
  updateValue: (text: string) => void;
}

class Input extends React.Component<InputProps> {
  // tslint:disable-next-line:no-any
  handleKeyDown({keyCode, target}: any) {
    const { index, maxIndex, upIndex, downIndex } = this.props;
    
    if (keyCode === KEY.UP && index > 0) {// up
      downIndex(index);
      target.value = '';
    } else if (keyCode === KEY.DOWN && index < maxIndex) {// down
      upIndex(index);
      target.value = '';
    } else if (keyCode === KEY.ENTER && target.value !== '') {
      target.value = '';
      // TODO location.href = ''
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
