import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import styles from '../Registration/registration.module.scss'
import { duplicateBackEnd } from '../unauthorizedActions'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const { uid, token } = useParams()
  const [loading, setLoading] = useState(false)

  const handleFinish = async (values) => {
    const hide = message.loading(`Сброс пароля...`, 0)
    setLoading(true)
    try {
      await dispatch(
        duplicateBackEnd(`/users/activate/${uid}/${token}/`, values),
      )
      hide()
      message.success(`Пароль успешно изменён`)
    } catch {
      hide()
      message.error(`Ошибка изменения пароля`)
    }
    setLoading(false)
  }

  return (
    <Form className={styles.wrapper} onFinish={handleFinish}>
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
      <Form.Item className={styles.buttons}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
          size="large"
          loading={loading}
        >
          Сбросить пароль
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ResetPassword
