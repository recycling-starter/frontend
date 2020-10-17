import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
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
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../../Authorized'
import { getBox, putBox } from '../boxesActions'
import styles from './box.module.scss'

const Box = () => {
  const dispatch = useDispatch()
  const setHeaderProps = useContext(HeaderContext)
  const { id } = useParams()
  const { box } = useSelector((state) => state.boxes)
  const [filling, setFilling] = useState(0)

  useEffect(() => {
    setHeaderProps({
      title: id,
      isReturnPossible: true,
    })
  }, [id, setHeaderProps])

  useEffect(() => {
    dispatch(getBox(id))
  }, [dispatch, id])

  useEffect(() => {
    if (box) setFilling(box.fullness)
  }, [setFilling, box])

  const handleFinish = (values) => {
    dispatch(putBox(id, { ...values, fullness: filling }))
  }

  const handleChangeFilling = (delta) => {
    setFilling(Math.max(0, Math.min(100, filling + delta)))
  }

  return box ? (
    <div>
      <Typography.Title level={4}>
        {box.building.address}, {box.room.toLowerCase()}
      </Typography.Title>
      <Divider />
      <Form onFinish={handleFinish}>
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
            onClick={() => handleChangeFilling(-20)}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleChangeFilling(20)}
          />
        </div>
        <p className={styles.text}>Изменение заполненности контейнера</p>
        <Divider />
        <Form.Item
          label="Расположение"
          initialValue={box.room}
          name="room"
          rules={[{ required: true, message: `Укажите расположение` }]}
        >
          <Input size="large" placeholder="Возле лестницы" />
        </Form.Item>
        <Button block type="primary" size="large" htmlType="submit">
          Сохранить
        </Button>
        <Divider />
        <Divider>Ответственные</Divider>
        {box.users.map((user) => (
          <Card
            key={user.id}
            title={user.first_name}
            className={styles.card}
            extra={<Button danger>Удалить</Button>}
          >
            Локация: {user.room.toLowerCase()}
          </Card>
        ))}
        <Select
          size="large"
          placeholder="Добавить ответственного из здания"
          className={styles.select}
        >
          <Select.Option value="Лестница">Иван Иванович – К505</Select.Option>
        </Select>
      </Form>
    </div>
  ) : null
}

export default Box
