import * as React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  position: fixed;
  top: 8px;
  padding: 4px 12px;
  width: 100%;
  color: grey;
  font-size: 16px;
  border: none;
`;

interface InputProps {
  index: number;
  maxIndex: number;
  upIndex: (index: number) => string;
  downIndex: (index: number) => string;
  updateValue: (text: string) => void;
}

class Input extends React.Component<InputProps> {
  // tslint:disable-next-line:no-any
  handleChange(e: any) {
    const { index, maxIndex, upIndex, downIndex, updateValue } = this.props;
    
    if (e.keyCode === 38 && index > 0) {// up
      e.target.value = downIndex(index);
    } else if (e.keyCode === 40 && index < maxIndex) {// down
      e.target.value = upIndex(index);
    } else if (e.keyCode === 13 && e.target.value !== '') {
      e.target.value = '';
    } else {
      updateValue(e.target.value);
    }
  }

  render() {
    return(
      <StyledInput
        placeholder={`Your Repository Name`}
        autoFocus={true}
        // tslint:disable-next-line:no-any
        onKeyDown={(e: any) => this.handleChange(e)}
      />
    );
  }
}

export default Input;
