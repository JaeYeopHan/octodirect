import React from 'react';
import { connect } from 'react-redux';

import { Input } from '../components/input/Input';
import { ItemList } from '../components/itemlist/ItemList';
import { Info } from '../components/info/Info';
import { RepoState } from '../reducers/repos.reducers';
import { upIndex, downIndex, updateValue } from '../actions/repos.action';

interface AppContainerProps {
  repos: RepoState;
  onPressUpKey: () => void;
  onPressDownKey: () => void;
  onChange: (value: string) => void;
}

class AppContainer extends React.Component<AppContainerProps> {
  render(): JSX.Element {
    const { repos, onPressUpKey, onPressDownKey, onChange } = this.props;

    return (
      <React.Fragment>
        <Input
          repos={repos}
          onPressUpKey={onPressUpKey}
          onPressDownKey={onPressDownKey}
          onChange={onChange}
        />
        <ItemList repos={repos} />
        <Info />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppContainerProps) => ({
  repos: state.repos,
});

const mapDispatchToProps = (dispatch: any) => ({
  onPressUpKey: () => dispatch(downIndex()),
  onPressDownKey: () => dispatch(upIndex()),
  onChange: (value: string) => dispatch(updateValue(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
