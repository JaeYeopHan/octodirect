import React, { Component, Fragment } from 'react';
import {
  TextInputField,
  Popover,
  TableRow,
  TextTableCell,
  Position,
  Button,
  toaster,
  // @ts-ignore
} from 'evergreen-ui';
import styled from 'styled-components';
import { UserInfoInterface } from '../../service/user-info.service';
import { SettingInfoState } from '../../reducers/setting-info.reducers';
import { RepoState } from '../../reducers/repos.reducers';
import { KeyUtils } from '../../utils/Key';

const FieldLayout = styled.div`
  height: 100%;
`;

const PopupLayout = styled.div`
  text-align: center;
  margin-top: -12px;
`;

interface DomainSettingState {
  domain: string;
}

interface DomainSettingProps {
  repos: RepoState;
  settingInfo: SettingInfoState;
  onClickSubmit: (info: UserInfoInterface) => void;
  onClickClose: () => void;
  onKeyDown: (domain: string) => void;
}

export class DomainSetting extends Component<
  DomainSettingProps,
  DomainSettingState
> {
  state: DomainSettingState = {
    domain: '',
  };

  render() {
    return (
      <Fragment>
        <FieldLayout>
          <TextInputField
            label="Filtering domain"
            placeholder="https://**"
            inputHeight={28}
            data-id="domain"
            description="Add url by press Enter"
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
              this.handleKeyDown(event)
            }
          />
          <PopupLayout>
            <Popover
              content={this.props.settingInfo.domainInfo.map((domain, i) => (
                <TableRow key={i} isSelectable={true}>
                  <TextTableCell>{domain}</TextTableCell>
                </TableRow>
              ))}
              position={Position.BOTTOM}
            >
              <Button>SHOW FILTERING LIST</Button>
            </Popover>
          </PopupLayout>
        </FieldLayout>
      </Fragment>
    );
  }

  private handleKeyDown({
    keyCode,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>): void {
    if (KeyUtils.isCorrectEnterKey(keyCode, currentTarget.value)) {
      const { onKeyDown } = this.props;
      const { value } = currentTarget;

      onKeyDown(value);
      currentTarget.value = '';
      toaster.success('Success to add domain address');
    }
  }
}
