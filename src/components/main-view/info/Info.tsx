import React from 'react'
import styled from 'styled-components'
import { FetchResponseType } from '../../../saga/repos.saga'

const Container = styled.div`
  position: relative;
  width: calc(100% - 20px);
  margin: auto;
  margin-top: 52px;
  margin-bottom: 8px;
`

const Logo = styled.span`
  margin-left: 4px;
  font-size: 12px;
  color: #666;
  :hover {
    color: #0366d6;
    cursor: pointer;
  }
`

const Button = styled.a`
  display: inline-block;
  position: absolute;
  right: 0px;
  color: #0366d6;
  font-size: 14px;
  :hover {
    color: #0366d6;
    text-decoration: none;
    cursor: pointer;
  }
  @keyframes flutter {
    0% {
      transform: rotate(0deg);
    }
    35% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(-5deg);
    }
    60% {
      transform: rotate(5deg);
    }
    65% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  &.ani {
    transform-origin: center;
    animation: flutter 2s infinite linear;
  }
`

interface InfoProps {
  onToggleView: () => void
  authStatus: FetchResponseType
}

const targetUrl = 'http://github.com/JaeYeopHan/octodirect'

export const Info: React.SFC<InfoProps> = ({ onToggleView, authStatus }) => {
  const handleClick = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`redirect to ${targetUrl}`)
    } else {
      chrome.tabs.create({ url: targetUrl })
      setTimeout(() => window.close, 300)
    }
  }

  return (
    <Container>
      <Logo onClick={() => handleClick()}>octodirect@#__VERSION__#</Logo>
      <Button
        className={authStatus === FetchResponseType.NOT_AUTHORIZED ? 'ani' : ''}
        onClick={onToggleView}
      >
        Setting
      </Button>
    </Container>
  )
}
