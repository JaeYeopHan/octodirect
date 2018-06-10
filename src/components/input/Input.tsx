/* tslint:disable: no-any */
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { upIndex, downIndex } from '../../actions/repo.action';
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
  repos: any;
  onPressUpKey: () => void;
  onPressDownKey: () => void;
}

class Input extends React.Component<InputProps> {
  handleKeyDown({ keyCode, target }: any) {
    const { index } = this.props.repos;
    if (KeyUtils.isCorrectUpKey(keyCode, index)) {
      this.props.onPressUpKey();
    } else if (KeyUtils.isCorrectDownKey(keyCode, index)) {
      this.props.onPressDownKey();
    } else if (KeyUtils.isCorrectEnterKey(keyCode, target.value)) {
      console.log(target.value);
      target.value = '';
    }
  }

  handleChange(e: any) {
    // this.props.updateValue(e.target.value);
  }

  render() {
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

const mapStateToProps = (state: InputProps) => ({
  repos: state.repos,
});

const mapDispatchToProps = (dispatch: any) => ({
  onPressUpKey: () => dispatch(downIndex()),
  onPressDownKey: () => dispatch(upIndex()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
