import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: calc(100% - 20px);
  margin: auto;
  margin-top: 52px;
  margin-bottom: 8px;
`;

const Logo = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #666;
`;

const Button = styled.a`
  margin-right: 8px;
  color: #0366d6;
  float: right;
  font-size: 14px;
  :hover {
    color: #0366d6;
    text-decoration: none;
    cursor: pointer;
  }
`;

interface InfoProps {
  onToggleView: () => void;
}

export const Info: React.SFC<InfoProps> = ({ onToggleView }) => (
  <Container>
    <Logo>
      <a href="http://github.com/JaeYeopHan/octodirect">octodirect</a>
      @0.1.0
    </Logo>
    <Button onClick={onToggleView}>Setting</Button>
  </Container>
);
