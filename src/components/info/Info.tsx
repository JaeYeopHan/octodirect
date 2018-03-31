import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: calc(100% - 20px);
  margin: auto;
  margin-top: 52px;
`;

const Logo = styled.span`
  font-size: 14px;
`;

const Button = styled.a`
  color: #0366D6;
  float: right;
  font-size: 14px;
  :hover {
    color: #0366D6;
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
  }
`;

const Info = () => (
  <Container>
    <Logo>@octodirect</Logo>
    <Button>Add permission</Button>
  </Container>
);

export default Info;
