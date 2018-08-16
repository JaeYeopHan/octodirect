import React, { Component, Fragment } from 'react';
import {
  TextInputField,
  Popover,
  TableRow,
  TextTableCell,
  PopoverContent,
  Position,
  Button,
  // @ts-ignore
} from 'evergreen-ui';
import styled from 'styled-components';
import { UserInfoInterface } from '../../service/user-info.service';
import { SettingInfoState } from '../../reducers/setting-info.reducers';
import { RepoState } from '../../reducers/repos.reducers';
import { Head } from './common/Head';
import { KeyUtils } from '../../utils/Key';

const FieldLayout = styled.div`
  height: 100%;
`;

const PopupLayout = styled.div`
  text-align: center;
  margin-top: -12px;
`;

interface BookmarkSettingState {
  domain: string;
}

interface BookmarkSettingProps {
  repos: RepoState;
  settingInfo: SettingInfoState;
  onClickSubmit: (info: UserInfoInterface) => void;
  onClickClose: () => void;
  addDomainInfo: (domain: string) => void;
}

export class BookmarkSetting extends Component<
  BookmarkSettingProps,
  BookmarkSettingState
> {
  state: BookmarkSettingState = {
    domain: '',
  };

  componentDidMount() {
    console.log(`componentDidMount -> `, this.props.settingInfo);
  }

  render() {
    return (
      <Fragment>
        <Head content={'Bookmark Setting'} />
        <FieldLayout>
          <TextInputField
            label="Filtering domain"
            placeholder="https://**"
            inputHeight={32}
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
      const { addDomainInfo } = this.props;
      const { value } = currentTarget;

      addDomainInfo(value);
      currentTarget.value = '';
    }
  }
}
