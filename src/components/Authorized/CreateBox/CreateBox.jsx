import React, { useEffect, useContext } from 'react'
import { Button, Divider, Form, Input, message, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { HeaderContext } from '../Authorized'
import { getBoxes, postBox } from '../Boxes/boxesActions'
import { PRIVATE_PATH } from '../../../config'
import styles from './createBox.module.scss'

const CreateBox = () => {
  const dispatch = useDispatch()
  const setHeaderProps = useContext(HeaderContext)
  const history = useHistory()
  const { buildings } = useSelector((state) => state.session)

  useEffect(() => {
    setHeaderProps({
      title: `Создать контейнер`,
    })
  }, [setHeaderProps])

  useEffect(() => {
    dispatch(getBoxes())
  }, [dispatch])

  const handleFinish = async (values) => {
    const { id } = await dispatch(postBox(values))
    message.success(`Контейнер создан`)
    history.push(`${PRIVATE_PATH.BOXES}/${id}`)
  }

  return (
    <Form layout="vertical" className={styles.wrapper} onFinish={handleFinish}>
      <Divider orientation="left">Настройки</Divider>
      <Form.Item
        label="Здание"
        name="building"
        rules={[{ required: true, message: `Выберите здание` }]}
      >
        <Select size="large" placeholder="Выберите здание">
          {buildings.map((building) => (
            <Select.Option value={building.id} key={building.id}>
              {building.address}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Расположение"
        name="room"
        rules={[{ required: true, message: `Введите расположение` }]}
      >
        <Input placeholder="Возле лестницы" size="large" />
      </Form.Item>
      <Divider />
      <Button block type="primary" size="large" htmlType="submit">
        Создать
      </Button>
    </Form>
  )
}

export default CreateBox
