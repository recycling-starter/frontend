import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { PUBLIC_PATH } from '../../../config'
import styles from './login.module.scss'

const Login = (props) => {
  const { setAuthorized } = props
  return (
    <>
      <Form className={styles.wrapper} initialValues={{ remember: true }}>
        <Form.Item label="Логин">
          <Input
            prefix={<UserOutlined />}
            placeholder="Телефон или email"
            size="large"
          />
        </Form.Item>
        <Form.Item label="Пароль">
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
            className={styles.loginButton}
            onClick={() => setAuthorized(true)}
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
