import React from 'react';
import styled from 'styled-components';

import { ItemsLayout } from '../ItemsLayout';

const LoadingElement = ItemsLayout.extend`
  height: 210px;
  font-size: 16px;
  text-align: center;
`;

const DonutLoading = styled.div`
  @keyframes donut-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #016cd1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-top: 64px;
  animation: donut-spin 1.2s linear infinite;
`;

export const Loading: React.SFC = () => (
  <LoadingElement>
    <DonutLoading />
  </LoadingElement>
);
