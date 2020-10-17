import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { PUBLIC_PATH } from '../../../config'
import styles from './login.module.scss'
import { login } from './loginActions'

const Login = () => {
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    console.log(values)
    dispatch(
      login({
        email: values.email,
        password: values.password,
      }),
    )
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
            placeholder="Телефон или email"
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
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className={styles.loginButton}
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
