import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  Progress,
  Button,
  Divider,
  Typography,
  Card,
  Select,
  Form,
  Input,
} from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { HeaderContext } from '../../Authorized'
import styles from './box.module.scss'

const Box = () => {
  const setHeaderProps = useContext(HeaderContext)
  const history = useHistory()
  const [filling, setFilling] = useState(0)

  useEffect(() => {
    const path = history.location.pathname
    setHeaderProps({
      title: path.substr(path.lastIndexOf(`/`) + 1),
      isReturnPossible: true,
    })
  }, [history.location.pathname, setHeaderProps])

  const handleChangeFilling = (delta) => {
    setFilling(Math.max(0, Math.min(100, filling + delta)))
  }

  return (
    <div>
      <Typography.Title level={4}>Биржевая 14, лестница</Typography.Title>
      <Divider />
      <Progress
        width="50vw"
        type="circle"
        percent={filling}
        className={styles.circle}
      />
      <Divider />
      <div className={styles.buttons}>
        <Button
          icon={<MinusOutlined />}
          onClick={() => handleChangeFilling(-10)}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={() => handleChangeFilling(10)}
        />
      </div>
      <p className={styles.text}>Изменение заполненности контейнера</p>
      <Divider />
      <Typography.Paragraph className={styles.paragraph}>
        <Typography.Text>Код контейнера: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          837263
        </Typography.Text>
      </Typography.Paragraph>
      <Divider />
      <Divider>Настройки</Divider>
      <Form>
        <Form.Item label="Здание">
          <Input size="large" placeholder="Биржевая 14" />
        </Form.Item>
        <Form.Item label="Расположение">
          <Input size="large" placeholder="Возле лестницы" />
        </Form.Item>
      </Form>
      <Divider>Ответственные</Divider>
      <Card
        title="Иван Иванович"
        className={styles.card}
        extra={<Button danger>Удалить</Button>}
      >
        Локация: К505
      </Card>
      <Select
        size="large"
        placeholder="Добавить ответственного из здания"
        className={styles.select}
      >
        <Select.Option value="Лестница">Иван Иванович – К505</Select.Option>
      </Select>
      <Divider />
      <Button block type="primary" size="large">
        Сохранить
      </Button>
    </div>
  )
}

export default Box