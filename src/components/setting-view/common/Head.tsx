import React from 'react';
import {
  Heading,
  // @ts-ignore
} from 'evergreen-ui';
import styled from 'styled-components';

const HeadLayout = styled.div`
  margin-bottom: 12px;
  height: 100%;
`;

export const Head = ({ content }: { content: string }) => (
  <HeadLayout>
    <Heading>{content}</Heading>
  </HeadLayout>
);
