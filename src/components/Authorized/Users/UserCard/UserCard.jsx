import { Card, Typography } from 'antd'
import React from 'react'
import styles from './userCard.module.scss'

const UserCard = () => {
  return (
    <Card title="Иван Иванович">
      <div className={styles.contentWrapper}>
        <Typography.Paragraph>
          <Typography.Text>Локация: </Typography.Text>
          <Typography.Text
            copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
            onClick={(evt) => evt.preventDefault()}
          >
            Биржевая 14, К505
          </Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text>Телефон: </Typography.Text>
          <Typography.Text
            copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
            onClick={(evt) => evt.preventDefault()}
          >
            +79123456789
          </Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text>E-mail: </Typography.Text>
          <Typography.Text
            copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
            onClick={(evt) => evt.preventDefault()}
          >
            ivanivanovich@mail.com
          </Typography.Text>
        </Typography.Paragraph>
      </div>
    </Card>
  )
}

export default UserCard
