import React, { useState } from 'react'
import { Button, Divider, Form, Input, message, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PUBLIC_PATH } from '../../../config'
import { resetPassword } from '../unauthorizedActions'
import styles from './restore.module.scss'

const Restore = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async (values) => {
    const hide = message.loading(`Создаем ссылку...`, 0)
    setLoading(true)
    try {
      await dispatch(resetPassword(values.email))
      message.success(`Ссылка для сброса пароля отправлена на ваш email`)
    } catch {
      message.error(`Ошибка отправки ссылки для сброса пароля`)
    }
    hide()
    setLoading(false)
  }

  return (
    <Form className={styles.wrapper} onFinish={handleResetPassword}>
      <Typography.Text className={styles.text}>
        Пожалуйста, укажите e-mail, который Вы раннее использовали для входа
      </Typography.Text>
      <Divider />
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: `Введите email` }]}
      >
        <Input placeholder="ivanovich@mail.com" type="email" size="large" />
      </Form.Item>
      <Form.Item className={styles.buttons}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.button}
          size="large"
          loading={loading}
        >
          Отправить ссылку
        </Button>
      </Form.Item>
      <Form.Item className={styles.buttons}>
        <Button className={styles.button} size="large">
          <Link to={PUBLIC_PATH.LOGIN}>На страницу входа</Link>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Restore
