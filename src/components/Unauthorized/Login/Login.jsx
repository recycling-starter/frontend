import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { PUBLIC_PATH } from '../../../config'
import { login } from '../unauthorizedActions'
import styles from './login.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    const hide = message.loading(`Вход...`, 0)
    setLoading(true)
    try {
      await dispatch(
        login({
          email: values.email,
          password: values.password,
        }),
      )
    } catch {
      hide()
      message.error(`Ошибка входа`)
    }
    setLoading(false)
  }

  return (
    <>
      <Form className={styles.wrapper} onFinish={handleSubmit}>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: `Введите e-mail` }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Ваш email"
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: `Введите пароль` }]}
        >
          <Input
            prefix={<LockOutlined />}
            placeholder="••••••••"
            type="password"
            size="large"
          />
        </Form.Item>
        <Form.Item className={styles.buttons}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className={styles.loginButton}
            loading={loading}
          >
            Войти
          </Button>
          <Link to={PUBLIC_PATH.RESTORE} className={styles.resetLink}>
            Забыли пароль?
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login
