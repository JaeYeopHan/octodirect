import React from 'react'
import {
  Text,
  DangerIcon,
  // @ts-ignore
} from 'evergreen-ui'

import { ItemsLayout } from '../ItemsLayout'

const NotFoundElement = ItemsLayout.extend`
  height: 210px;
  font-size: 16px;
  text-align: center;
`

export const NotFound: React.SFC<{ value: string }> = ({ value }) => (
  <NotFoundElement>
    <Text>
      <div>
        <DangerIcon size={60} iconWidth={48} iconHeight={48} />
      </div>
      <p>We couldn’t find any repositories!</p>
    </Text>
    <Text size={300}>
      <p>If you type enter,</p>
      <p>search '{value}' in google.</p>
    </Text>
  </NotFoundElement>
)
