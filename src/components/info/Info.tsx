import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: calc(100% - 20px);
  margin: auto;
  margin-top: 52px;
`;

const Logo = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: #666;
`;

const Button = styled.a`
  color: #0366d6;
  float: right;
  font-size: 14px;
  :hover {
    color: #0366d6;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const Info: React.SFC = () => (
  <Container>
    <Logo>
      octodirect<a href="http://github.com/JaeYeopHan">@Jbee</a>
    </Logo>
    <Button>Setting</Button>
  </Container>
);
