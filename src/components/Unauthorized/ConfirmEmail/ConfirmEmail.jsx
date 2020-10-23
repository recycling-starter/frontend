import React, { useEffect, useState } from 'react'
import { Result, Button, message, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { PUBLIC_PATH } from '../../../config'
import { duplicateBackEnd } from '../unauthorizedActions'

const ConfirmEmail = () => {
  const dispatch = useDispatch()
  const { uid, token } = useParams()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(true)

  const handleConfirm = async (values) => {
    const hide = message.loading(`Подтверждение почты...`, 0)
    setLoading(true)
    try {
      await dispatch(
        duplicateBackEnd(`/users/activate/${uid}/${token}/`, values),
      )
      setSuccess(true)
    } catch {
      setSuccess(false)
    }
    hide()
    setLoading(false)
  }

  useEffect(() => {
    handleConfirm().then()
  }, [])
  if (loading) return null
  return success ? (
    <Result
      status="success"
      title="Аккаунт подтверждён"
      extra={[
        <Link to={PUBLIC_PATH.LOGIN} key="toLogin">
          <Button type="primary">На страницу входа</Button>
        </Link>,
      ]}
    />
  ) : (
    <Result
      status="error"
      title="Ошибка подтверждения аккаунта"
      extra={[
        <Link to={PUBLIC_PATH.LOGIN} key="toLogin">
          <Button danger>На страницу входа</Button>
        </Link>,
      ]}
    />
  )
}

export default ConfirmEmail
