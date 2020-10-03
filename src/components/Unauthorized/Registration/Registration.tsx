import React from 'react'
import { Form, Input, InputNumber, Button, PageHeader, Select } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { PUBLIC_PATH } from '../../../config'
import styles from './registration.module.scss'

const Registration = () => {
  return (
    <>
      <PageHeader
        title="Регистрация"
        onBack={() => null}
        backIcon={
          <Link
            to={PUBLIC_PATH.LOGIN}
            className={styles.registerLink}
            style={{ color: `inherit` }}
          >
            <ArrowLeftOutlined />
          </Link>
        }
      />
      <Form className={styles.wrapper}>
        <Form.Item label="Имя" required>
          <Input placeholder="Иван Иванович" size="large" />
        </Form.Item>
        <Form.Item label="E-mail" required>
          <Input placeholder="ivanovich@mail.com" type="email" size="large" />
        </Form.Item>
        <Form.Item label="Телефон" required>
          <Input placeholder="+7 (912) 345 67 89" type="phone" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="••••••••" size="large" />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Подтвердите пароль"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Подтвердите пароль',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(`Пароли не совпадают`)
              },
            }),
          ]}
        >
          <Input.Password placeholder="••••••••" size="large" />
        </Form.Item>
        <Form.Item label="Здание" required>
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
            <Select.Option value="jack">Биржевая линия 14-16</Select.Option>
            <Select.Option value="lucy">Ломоносова 9</Select.Option>
            <Select.Option value="tom">Кронверкский проспект 49</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Расположение контейнера" required>
          <Input placeholder="Возле 312 аудитории" size="large" />
        </Form.Item>
        <Form.Item label="Код контейнера" required>
          <InputNumber
            formatter={(value) => `# ${value}`}
            className={styles.containerCode}
            size="large"
          />
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
