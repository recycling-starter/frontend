import React, { useContext, useEffect } from 'react'
import { Button, Divider, Form, Input, InputNumber, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../Authorized'
import styles from './settings.module.scss'
import {
  getOrganization,
  patchUser,
  putOrganization,
  putUserData,
} from './settingsActions'

const Settings = () => {
  const dispatch = useDispatch()
  const setHeaderProps = useContext(HeaderContext)
  const { organization } = useSelector((state) => state.settings)
  const { name, phone, room, isAdmin, email } = useSelector(
    (state) => state.session,
  )
  const [form] = Form.useForm()

  useEffect(() => {
    setHeaderProps({ title: `Настройки` })
  }, [setHeaderProps])

  useEffect(() => {
    if (isAdmin) dispatch(getOrganization())
  }, [dispatch, isAdmin])

  const handleUpdateOrganization = async (values) => {
    try {
      await dispatch(putOrganization(values))
      message.success(`Настройки организации сохранены`)
    } catch {
      message.error(`Ошибка при сохранении настроек`)
    }
    form.resetFields()
  }

  const handleUpdateUserData = async (values) => {
    try {
      await dispatch(putUserData(values))
      message.success(`Настройки сохранены`)
    } catch {
      message.error(`Ошибка при сохранении настроек`)
    }
    form.resetFields()
  }

  const handleChangePassword = async (values) => {
    const { password, new_password } = values
    try {
      await dispatch(patchUser({ old_password: password, new_password }))
      message.success(`Пароль успешно изменен`)
    } catch (err) {
      message.error(`Ошибка при изменении пароля`)
      if (err.old_password) message.warn(`Старый пароль введён неверно`)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Form layout="vertical" form={form} onFinish={handleUpdateUserData}>
        <Divider orientation="left">Профиль</Divider>
        <Form.Item label="E-mail">
          <Input
            disabled
            placeholder="email@mail.com"
            size="large"
            type="email"
            value={email}
          />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="first_name"
          initialValue={name}
          rules={[{ required: true, message: `Введите имя` }]}
        >
          <Input placeholder="Иван Иванович" size="large" />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="phone"
          initialValue={phone}
          rules={[{ required: true, message: `Введите телефон` }]}
        >
          <Input placeholder={phone} size="large" type="phone" />
        </Form.Item>
        <Form.Item
          label="Локация"
          name="room"
          initialValue={room}
          rules={[{ required: true, message: `Введите локацию` }]}
        >
          <Input placeholder="Возле лестницы" size="large" />
        </Form.Item>
        <Divider />
        <Button block type="primary" size="large" htmlType="submit">
          Сохранить
        </Button>
      </Form>
      <Form layout="vertical" onFinish={handleChangePassword}>
        <Divider orientation="left">Сменить пароль</Divider>
        <Form.Item
          hasFeedback
          name="password"
          label="Старый пароль"
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
          name="new_password"
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
          dependencies={[`new_password`]}
          rules={[
            {
              required: true,
              message: `Подтвердите пароль`,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue(`new_password`) === value) {
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
        <Button
          block
          type="primary"
          htmlType="submit"
          size="large"
          style={{ marginBottom: 24 }}
        >
          Сменить пароль
        </Button>
      </Form>
      {organization && (
        <Form
          layout="vertical"
          name="organization"
          onFinish={handleUpdateOrganization}
        >
          <Divider orientation="left">Рассылка</Divider>
          <Form.Item
            label="E-mail для рассылки"
            name="dropoff_email_from"
            initialValue={organization.dropoff_email_from}
            rules={[{ required: true, message: `Введите e-mail` }]}
          >
            <Input placeholder="mailing@mail.com" size="large" />
          </Form.Item>
          <Form.Item
            label="E-mail для ответа"
            name="dropoff_email_to"
            initialValue={organization.dropoff_email_to}
            rules={[{ required: true, message: `Введите e-mail` }]}
          >
            <Input placeholder="mailing@mail.com" size="large" />
          </Form.Item>
          <Form.Item
            label="Минимум контейнеров для вывоза"
            name="min_full_boxes"
            initialValue={organization.min_full_boxes}
            rules={[{ required: true, message: `Заполните поле` }]}
          >
            <InputNumber placeholder="3" size="large" />
          </Form.Item>
          <Form.Item
            label="Заполненность для вызова компании"
            name="min_fullness_level_dropoff_call"
            initialValue={organization.min_fullness_level_dropoff_call}
            rules={[{ required: true, message: `Заполните поле` }]}
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
            name="min_fullness_level_dropoff"
            initialValue={organization.min_fullness_level_dropoff}
            rules={[{ required: true, message: `Заполните поле` }]}
          >
            <InputNumber
              placeholder="3"
              size="large"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
            />
          </Form.Item>
          <Button block type="primary" size="large" htmlType="submit">
            Сохранить
          </Button>
        </Form>
      )}
    </div>
  )
}

export default Settings
