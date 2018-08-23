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
  margin-left: 4px;
  font-size: 12px;
  color: #666;
  :hover {
    color: #0366d6;
    cursor: pointer;
  }
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

const targetUrl = 'http://github.com/JaeYeopHan/octodirect';

export const Info: React.SFC<InfoProps> = ({ onToggleView }) => {
  const handleClick = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`redirect to ${targetUrl}`);
    } else {
      chrome.tabs.create({ url: targetUrl });
      setTimeout(() => window.close, 300);
    }
  };

  return (
    <Container>
      <Logo onClick={() => handleClick()}>octodirect@#__VERSION__#</Logo>
      <Button onClick={onToggleView}>Setting</Button>
    </Container>
  );
};
