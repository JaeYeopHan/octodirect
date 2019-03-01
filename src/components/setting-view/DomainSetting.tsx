import React, { Component, Fragment } from 'react'
import {
  TextInputField,
  Popover,
  TableRow,
  TextTableCell,
  Position,
  Button,
  toaster,
  CloseIcon,
  // @ts-ignore
} from 'evergreen-ui'
import styled from 'styled-components'
import autobind from 'autobind-decorator'

import { UserInfoInterface } from '../../service/user-info.service'
import { SettingInfoState } from '../../reducers/setting-info.reducers'
import { RepoState } from '../../reducers/repos.reducers'
import { KeyUtils } from '../../utils/Key'

const FieldLayout = styled.div`
  height: 100%;
`

const PopupLayout = styled.div`
  text-align: center;
  margin-top: -12px;
`

const TableContent = styled.span`
  margin-left: 8px;
`

interface DomainSettingState {
  domain: string
}

interface DomainSettingProps {
  repos: RepoState
  settingInfo: SettingInfoState
  onClickSubmit: (info: UserInfoInterface) => void
  onClickClose: () => void
  onKeyDown: (domain: string) => void
  onClickDelete: (domainInfo: string) => void
}

export class DomainSetting extends Component<
  DomainSettingProps,
  DomainSettingState
> {
  state: DomainSettingState = {
    domain: '',
  }

  render() {
    return (
      <Fragment>
        <FieldLayout>
          <TextInputField
            label="Filtering domains"
            placeholder="https://**"
            inputHeight={28}
            data-id="domain"
            description="Add url by press Enter"
            onKeyDown={this.handleKeyDown}
          />
          <PopupLayout>
            <Popover
              content={this.props.settingInfo.domainInfo.map((domain, i) => (
                <TableRow key={i} isSelectable={true}>
                  <TextTableCell
                    onClick={this.handleClickItem}
                    data-value={domain}
                  >
                    <CloseIcon size={16} iconWidth={10} iconHeight={10} />
                    <TableContent>{domain}</TableContent>
                  </TextTableCell>
                </TableRow>
              ))}
              position={Position.BOTTOM}
            >
              <Button>SHOW FILTERING LIST</Button>
            </Popover>
          </PopupLayout>
        </FieldLayout>
      </Fragment>
    )
  }

  @autobind
  private handleClickItem({ currentTarget }: React.MouseEvent<HTMLElement>) {
    const target = currentTarget.dataset.value

    if (target) {
      this.props.onClickDelete(target)
      toaster.success('Deleted!', { duration: 1 })
    }
  }

  @autobind
  private handleKeyDown({
    keyCode,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>): void {
    if (KeyUtils.isEnterKey(keyCode)) {
      const { onKeyDown } = this.props
      const { value } = currentTarget

      if (value === '') {
        return
      }
      onKeyDown(value)
      currentTarget.value = ''
      toaster.success('Success to add', { duration: 1 })
    }
  }
}
