import React from 'react'
import { Button, Divider, Form, Input, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { PUBLIC_PATH } from '../../../config'
import styles from './restore.module.scss'

const Restore = () => {
  return (
    <Form className={styles.wrapper}>
      <Typography.Text>
        Пожалуйста, укажите e-mail, который Вы раннее использовали для входа
      </Typography.Text>
      <Divider />
      <Form.Item label="E-mail">
        <Input placeholder="ivanovich@mail.com" type="email" size="large" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.button}
          size="large"
        >
          Отправить ссылку
        </Button>
      </Form.Item>
      <Form.Item>
        <Button className={styles.button} size="large">
          <Link to={PUBLIC_PATH.LOGIN}>На страницу входа</Link>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Restore
