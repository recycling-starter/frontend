import { Card, Typography } from 'antd'
import React from 'react'
import moment from 'moment'
import styles from './callCard.module.scss'

const CallCard = (props) => {
  const { time, isDropped, address } = props

  return (
    <Card
      title={moment(time).format(`DD.MM.YYYY`)}
      extra={
        isDropped ? (
          <Typography.Text disabled>Завершён</Typography.Text>
        ) : (
          <Typography.Text type="success">Активен</Typography.Text>
        )
      }
      className={isDropped && styles.dropped}
    >
      <Typography.Paragraph>
        <Typography.Text>Адрес: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          {address}
        </Typography.Text>
      </Typography.Paragraph>
    </Card>
  )
}

export default CallCard
