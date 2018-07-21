import * as React from 'react';
import { connect } from 'react-redux';

import Input from '../components/input/Input';
import ItemList from '../components/itemlist/ItemList';
import Info from '../components/info/Info';
import { RepoState } from '../reducers/repos.reducers';

interface AppContainerProps {
  repos: RepoState;
}

class AppContainer extends React.Component<AppContainerProps> {
  render(): JSX.Element {
    const { repos } = this.props;

    return (
      <React.Fragment>
        <Input />
        <ItemList repos={repos} />
        <Info />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppContainerProps) => ({
  repos: state.repos,
});

export default connect(mapStateToProps)(AppContainer);
