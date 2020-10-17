import React, { useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getBuildings } from '../unauthorizedActions'
import styles from './registration.module.scss'

const Registration = () => {
  const dispatch = useDispatch()
  const { buildings } = useSelector((state) => state.session)

  useEffect(() => {
    dispatch(getBuildings())
  }, [dispatch])

  const handleFinish = (values) => {
    console.log(values)
  }

  return (
    <>
      <Form onFinish={handleFinish}>
        <Form.Item
          label="Имя"
          name="first_name"
          rules={[{ required: true, message: `Введите имя` }]}
        >
          <Input placeholder="Иван Иванович" size="large" />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: `Введите E-mail` }]}
        >
          <Input placeholder="ivanovich@mail.com" type="email" size="large" />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="phone"
          rules={[{ required: true, message: `Введите номер телефона` }]}
        >
          <Input placeholder="+7 (912) 345 67 89" type="phone" size="large" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: `Введите пароль`,
            },
          ]}
        >
          <Input.Password placeholder="••••••••" size="large" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="confirm"
          label="Подтвердите пароль"
          dependencies={[`password`]}
          rules={[
            {
              required: true,
              message: `Подтвердите пароль`,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue(`password`) === value) {
                  return Promise.resolve()
                }
                return Promise.reject(`Пароли не совпадают`)
              },
            }),
          ]}
        >
          <Input.Password placeholder="••••••••" size="large" />
        </Form.Item>
        <Form.Item
          required
          label="Здание"
          name="building"
          rules={[{ required: true, message: `Выберите здание` }]}
        >
          <Select
            showSearch
            placeholder="Выберите здание"
            optionFilterProp="children"
            notFoundContent="Здание не найдено"
            filterOption={(input, option) =>
              option
                ? option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                : false
            }
            size="large"
          >
            {buildings.map((building) => (
              <Select.Option value={building.id} key={building.id}>
                {building.address}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          required
          label="Ваше расположение"
          name="room"
          rules={[{ required: true, message: `Введите ваше расположение` }]}
        >
          <Input placeholder="Кабинет 312" size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            size="large"
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Registration
