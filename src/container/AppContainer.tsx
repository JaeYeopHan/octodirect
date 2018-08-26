import React from 'react';
import { connect } from 'react-redux';

import { ViewState } from '../reducers/view.reducers';
import MainContainer from './MainContainer';
import SettingContainer from './SettingContainer';

interface AppContainerProps {
  view: ViewState;
}

class AppContainer extends React.Component<AppContainerProps> {
  render(): JSX.Element {
    const { view } = this.props;

    switch (view.type) {
      case 'main':
        return <MainContainer />;
      case 'setting':
        return <SettingContainer />;
      default:
        return <MainContainer />;
    }
  }
}

const mapStateToProps = (state: AppContainerProps) => ({
  view: state.view,
});

export default connect(mapStateToProps)(AppContainer);
