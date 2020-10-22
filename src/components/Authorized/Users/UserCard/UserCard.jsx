import { Card, Typography } from 'antd'
import React from 'react'
import styles from './userCard.module.scss'

const UserCard = (props) => {
  const { building, room, email, name, phone, isAdmin, disabled } = props

  const getExtraContent = () => {
    if (isAdmin) return <Typography.Text type="warning">Admin</Typography.Text>
    if (disabled) return <Typography.Text disabled>Inactive</Typography.Text>
  }

  return (
    <Card
      title={name || `Безымянный пользователь`}
      extra={getExtraContent()}
      className={disabled ? styles.disabledCard : styles.card}
    >
      <div className={styles.contentWrapper}>
        <Typography.Paragraph>
          <Typography.Text>Локация: </Typography.Text>
          <Typography.Text
            copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
            onClick={(evt) => evt.preventDefault()}
          >
            {building || `не указана`}, {room && room.toLowerCase()}
          </Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text>Телефон: </Typography.Text>
          <Typography.Text
            copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
            onClick={(evt) => evt.preventDefault()}
          >
            {phone || `не указан`}
          </Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text>E-mail: </Typography.Text>
          <Typography.Text
            copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
            onClick={(evt) => evt.preventDefault()}
          >
            {email || `не указан`}
          </Typography.Text>
        </Typography.Paragraph>
      </div>
    </Card>
  )
}

export default UserCard
