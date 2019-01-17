import React from 'react';
import styled from 'styled-components';
import { KeyUtils } from '../../../utils/Key';
import { RepoState } from '../../../reducers/repos.reducers';
import { ItemType } from '../../../model/item.model';
import { GOOGLE_SEARCH_URL } from '../../../main/appConfig';

const StyledInput = styled.input`
  position: fixed;
  top: 8px;
  padding: 4px 12px;
  width: 240px;
  color: #cad5df;
  font-size: 16px;
  border: none;
  ::placeholder {
    color: grey;
  }
`;

interface InputProps {
  repos: RepoState;
  onPressUpKey: () => void;
  onPressDownKey: () => void;
  onChange: (value: string) => void;
  openTarget: (url: string) => void;
}

export class Input extends React.Component<InputProps> {
  public render(): JSX.Element {
    const { value } = this.props.repos;

    return (
      <StyledInput
        placeholder={value ? value : 'Find a repository'}
        autoFocus={true}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
          this.handleKeyDown(event)
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          this.handleChange(event)
        }
      />
    );
  }

  private handleKeyDown({
    keyCode,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>): void {
    const { openTarget, repos } = this.props;
    const { index, maxIndex, filtered } = repos;

    if (KeyUtils.isCorrectUpKey(keyCode, index)) {
      return this.props.onPressUpKey();
    }

    if (KeyUtils.isCorrectDownKey(keyCode, index, maxIndex)) {
      this.props.onPressDownKey();
      return;
    }

    if (KeyUtils.isEnterKey(keyCode)) {
      const { placeholder: value } = currentTarget;
      const targetUrl = this.getTargetUrl(filtered, value, index);

      if (process.env.NODE_ENV === 'development') {
        console.log(targetUrl);
      } else {
        openTarget(targetUrl);
        currentTarget.placeholder = '';
      }
    }
  }

  private getTargetUrl(filtered: ItemType[], value: string, index: number) {
    if (filtered.length === 0) {
      return `${GOOGLE_SEARCH_URL}${value}`;
    }
    return filtered[index].htmlUrl;
  }

  private handleChange({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>): void {
    return this.props.onChange(currentTarget.value);
  }
}
