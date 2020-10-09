import { Card, Typography } from 'antd'
import React from 'react'
import styles from './callCard.module.scss'

const CallCard = () => {
  return (
    <Card title="09.10.2020">
      <Typography.Paragraph>
        <Typography.Text>Адрес: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          Биржевая 14
        </Typography.Text>
      </Typography.Paragraph>
    </Card>
  )
}

export default CallCard
