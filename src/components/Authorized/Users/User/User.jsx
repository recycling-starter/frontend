import React, { useContext, useEffect } from 'react'
import { Divider, Typography, Card, Button, Progress, Select } from 'antd'
import { HeaderContext } from '../../Authorized'
import styles from './user.module.scss'

const User = () => {
  const setHeaderProps = useContext(HeaderContext)

  useEffect(() => {
    setHeaderProps({
      title: `Иван Иванович`,
      isReturnPossible: true,
    })
  }, [setHeaderProps])

  return (
    <div className={styles.wrapper}>
      <Divider orientation="left">Информация</Divider>
      <Typography.Paragraph>
        <Typography.Text>E-mail: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          username@mail.domain
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
        <Typography.Text>Здание: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          Биржевая 14
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Локация: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          К505
        </Typography.Text>
      </Typography.Paragraph>
      <Divider orientation="left">Контейнеры</Divider>
      <Card
        title="Возле лестницы"
        className={styles.card}
        extra={<Button danger>Удалить</Button>}
      >
        <Progress percent={75} status="active" />
      </Card>
      <Select
        size="large"
        placeholder="Добавить контейнер из здания"
        className={styles.select}
      >
        <Select.Option value="Лестница">У лестницы</Select.Option>
        <Select.Option value="К505">Возле К505</Select.Option>
      </Select>
    </div>
  )
}

export default User
