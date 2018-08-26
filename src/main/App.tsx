import React from 'react';
import styled from 'styled-components';

import AppContainer from '../container/AppContainer';

export const AppLayout = styled.div`
  width: 280px;
  height: 100%;
`;

export default () => (
  <AppLayout>
    <AppContainer />
  </AppLayout>
);
