import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import {
  Progress,
  Button,
  Divider,
  Typography,
  Card,
  Select,
  Form,
  Input,
  message,
} from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { HeaderContext } from '../../Authorized'
import {
  deleteBox,
  deleteUserFromBox,
  getAvailableUsers,
  getBox,
  postUserToBox,
  putBox,
} from '../boxesActions'
import styles from './box.module.scss'

const Box = () => {
  const dispatch = useDispatch()
  const setHeaderProps = useContext(HeaderContext)
  const history = useHistory()
  const { id } = useParams()
  const isDesktop = useMediaQuery({ minDeviceWidth: 1224 })
  const { box, availableUsers } = useSelector((state) => state.boxes)
  const { isAdmin } = useSelector((state) => state.session)
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

  useEffect(() => {
    dispatch(getAvailableUsers(id))
  }, [id, dispatch])

  const handleFinish = async (values) => {
    await dispatch(putBox(id, { ...values, fullness: filling }))
    message.success(`Данные сохранены`)
  }

  const handleChangeFilling = (delta) => {
    setFilling(Math.max(0, Math.min(100, filling + delta)))
  }

  const handleDeleteBox = async () => {
    await dispatch(deleteBox(id))
    message.warn(`Контейнер удален`)
    history.push(`./`)
  }

  const handleDeleteUserFromBox = async (user) => {
    await dispatch(deleteUserFromBox({ user, id }))
    message.warn(`Ответственный пользователь удалён`)
    dispatch(getBox(id))
    dispatch(getAvailableUsers(id))
  }

  const handleAddUserToBox = async (user) => {
    await dispatch(postUserToBox({ user, id }))
    message.success(`Ответственный пользователь добавлен`)
  }

  if (!box) return null
  return (
    <div className={styles.wrapper}>
      <Typography.Title level={4}>
        {box.building.address}, {box.room.toLowerCase()}
      </Typography.Title>
      <Divider />
      <Form layout="vertical" onFinish={handleFinish}>
        <Progress
          width={!isDesktop && `50vw`}
          type={isDesktop ? `line` : `circle`}
          percent={filling}
          status="active"
          className={!isDesktop && styles.circle}
        />
        <Divider />
        <div className={styles.buttons}>
          <Button
            size="large"
            icon={<MinusOutlined />}
            onClick={() => handleChangeFilling(-20)}
          />
          <Button
            size="large"
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
        {isAdmin && (
          <>
            <Divider>Ответственные</Divider>
            {box.users.map((user) => (
              <Card
                key={user.id}
                title={user.first_name}
                className={styles.card}
                extra={
                  <Button
                    danger
                    onClick={() => handleDeleteUserFromBox(user.id)}
                  >
                    Удалить
                  </Button>
                }
              >
                Локация: {user.room.toLowerCase()}
              </Card>
            ))}
            <Select
              size="large"
              value="Добавить ответственного из здания"
              className={styles.select}
              onChange={handleAddUserToBox}
            >
              {availableUsers.map((user) => (
                <Select.Option value={user.id} key={user.id}>
                  {user.first_name} – {user.room.toLowerCase()}
                </Select.Option>
              ))}
            </Select>
            <Divider />
            <Button block danger size="large" onClick={handleDeleteBox}>
              Удалить контейнер
            </Button>
          </>
        )}
      </Form>
    </div>
  )
}

export default Box
