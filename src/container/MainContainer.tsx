import React from 'react';
import { connect } from 'react-redux';

import { RepoState } from '../reducers/repos.reducers';
import { Input } from '../components/main-view/input/Input';
import { ItemList } from '../components/main-view/itemlist/ItemList';
import { Info } from '../components/main-view/info/Info';
import { actions } from '../actions/actions';

interface MainContainerProps {
  repos: RepoState;

  decrementIndex: () => void;
  incrementIndex: () => void;
  updateValue: (value: string) => void;
  toggleView: () => void;
}

class MainContainer extends React.Component<MainContainerProps> {
  handlePressUpKey() {
    this.props.decrementIndex();
  }

  handlePressDownKey() {
    this.props.incrementIndex();
  }

  handleInputChange(value: string) {
    this.props.updateValue(value);
  }

  render(): JSX.Element {
    const { repos, toggleView } = this.props;

    return (
      <React.Fragment>
        <Input
          repos={repos}
          onPressUpKey={() => this.handlePressUpKey()}
          onPressDownKey={() => this.handlePressDownKey()}
          onChange={(value: string) => this.handleInputChange(value)}
        />
        <ItemList repos={repos} />
        <Info onToggleView={toggleView} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: MainContainerProps) => {
  console.log(state);
  return {
    repos: state.repos,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  decrementIndex: () => dispatch(actions.decrementIndex()),
  incrementIndex: () => dispatch(actions.incrementIndex()),
  updateValue: (value: string) => dispatch(actions.updateValue(value)),
  toggleView: () => dispatch(actions.toggleView()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer);
