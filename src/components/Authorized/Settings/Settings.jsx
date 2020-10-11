import React, { useContext, useEffect } from 'react'
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from 'antd'
import moment from 'moment'
import { HeaderContext } from '../Authorized'

const Settings = () => {
  const setHeaderProps = useContext(HeaderContext)

  useEffect(() => {
    setHeaderProps({ title: `Настройки` })
  }, [setHeaderProps])

  return (
    <Form>
      <Divider orientation="left">Профиль</Divider>
      <Form.Item
        label="Имя"
        name="username"
        rules={[{ required: true, message: `Введите имя` }]}
      >
        <Input placeholder="Иван Иванович" size="large" />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: `Введите email` }]}
      >
        <Input placeholder="email@mail.com" size="large" type="email" />
      </Form.Item>
      <Form.Item
        label="Телефон"
        name="phone"
        rules={[{ required: true, message: `Введите телефон` }]}
      >
        <Input placeholder="89123456789" size="large" type="phone" />
      </Form.Item>
      <Form.Item
        label="Здание"
        name="building"
        rules={[{ required: true, message: `Выберите здание` }]}
      >
        <Select size="large" placeholder="Выберите здание">
          <Select.Option value="Биржевая линия 14-16">
            Биржевая линия 14-16
          </Select.Option>
          <Select.Option value="Ломоносова 9">Ломоносова 9</Select.Option>
          <Select.Option value="Кронверкский проспект 49">
            Кронверкский проспект 49
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Локация"
        name="location"
        rules={[{ required: true, message: `Введите локацию` }]}
      >
        <Input placeholder="Возле лестницы" size="large" />
      </Form.Item>
      <Divider />
      <Button block type="primary" size="large">
        Сохранить
      </Button>
      <Divider orientation="left">Сменить пароль</Divider>
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
      <Divider />
      <Button block type="primary" size="large" style={{ marginBottom: 24 }}>
        Сменить пароль
      </Button>
      <Button block size="large">
        Сбросить пароль
      </Button>
      <Divider orientation="left">Рассылка</Divider>
      <Form.Item
        label="E-mail для рассылки"
        name="mailingEmail"
        rules={[{ required: true, message: `Введите e-mail` }]}
      >
        <Input placeholder="mailing@mail.com" size="large" />
      </Form.Item>
      <Form.Item
        label="Время вызова компании"
        name="callTime"
        rules={[{ required: true, message: `Введите время вызова` }]}
      >
        <TimePicker
          defaultValue={moment(`12:08`, `HH:mm`)}
          placeholder="Время"
          format="HH:mm"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label="Максимум заполненных контейнеров"
        name="maxOfFulled"
        rules={[{ required: true, message: `Введите e-mail` }]}
      >
        <InputNumber placeholder="3" size="large" />
      </Form.Item>
      <Form.Item
        label="Заполненность для вызова компании"
        name="callTrigger"
        rules={[{ required: true, message: `Введите e-mail` }]}
      >
        <InputNumber
          placeholder="3"
          size="large"
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
        />
      </Form.Item>
      <Form.Item
        label="Заполненность для вывоза контейнера"
        name="alsoTake"
        rules={[{ required: true, message: `Введите e-mail` }]}
      >
        <InputNumber
          placeholder="3"
          size="large"
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
        />
      </Form.Item>
      <Button block type="primary" size="large">
        Сохранить
      </Button>
    </Form>
  )
}

export default Settings
