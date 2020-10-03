import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './login.module.scss'
import { PUBLIC_PATH } from '../../../config'

const Login = () => {
  return (
    <>
      <PageHeader title="Вход" />
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
          <Button type="primary" className={styles.loginButton} size="large">
            <Link className={styles.registerLink} to={PUBLIC_PATH.REGISTRATION}>
              Войти
            </Link>
          </Button>
        </Form.Item>
        <Form.Item className={styles.buttonsWrapper}>
          <Button className={styles.registerButton}>
            <Link className={styles.registerLink} to={PUBLIC_PATH.REGISTRATION}>
              Регистрация
            </Link>
          </Button>
          <Link to={PUBLIC_PATH.RESTORE} className={styles.forgotPassword}>
            Забыли пароль?
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login
