import { Card, Typography } from 'antd'
import React from 'react'
import moment from 'moment'
import { CopyOutlined } from '@ant-design/icons'
import styles from './callCard.module.scss'

const CallCard = (props) => {
  const { time, isDropped, address, error } = props

  const getStatus = () => {
    if (error) return <Typography.Text type="danger">Ошибка</Typography.Text>
    else if (isDropped)
      return <Typography.Text disabled>Завершён</Typography.Text>
    else return <Typography.Text type="success">Активен</Typography.Text>
  }

  return (
    <Card
      title={moment(time).format(`DD.MM.YYYY`)}
      extra={getStatus()}
      className={isDropped && styles.dropped}
    >
      <Typography.Paragraph>
        <Typography.Text type={error && `danger`}>Адрес: </Typography.Text>
        <Typography.Text
          type={error && `danger`}
          copyable={{
            tooltips: [`Скопировать`, `Скопировано`],
            icon: <CopyOutlined style={{ color: error && `#f5222d` }} />,
          }}
          onClick={(evt) => evt.preventDefault()}
        >
          {address}
        </Typography.Text>
      </Typography.Paragraph>
    </Card>
  )
}

export default CallCard
