import React, { useContext, useEffect } from 'react'
import { Divider, Typography, Card, Progress } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { HeaderContext } from '../../Authorized'
import { getUser } from '../usersActions'
import { PRIVATE_PATH } from '../../../../config'
import styles from './user.module.scss'

const User = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const setHeaderProps = useContext(HeaderContext)
  const { user } = useSelector((state) => state.users)

  useEffect(() => {
    setHeaderProps({
      title: user && user.first_name,
      isReturnPossible: true,
    })
  }, [setHeaderProps, user])

  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, id])

  if (!user) return null
  return (
    <div className={styles.wrapper}>
      <Divider orientation="left">Информация</Divider>
      <Typography.Paragraph>
        <Typography.Text>E-mail: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          {user.email || `не указана`}
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Телефон: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          {user.phone || `не указана`}
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Здание: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          {user.building || `не указано`}
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text>Локация: </Typography.Text>
        <Typography.Text
          copyable={{ tooltips: [`Скопировать`, `Скопировано`] }}
          onClick={(evt) => evt.preventDefault()}
        >
          {user.room || `не указана`}
        </Typography.Text>
      </Typography.Paragraph>
      <Divider orientation="left">Контейнеры</Divider>
      {user.boxes.map((box) => (
        <Link to={`${PRIVATE_PATH.BOXES}/${box.id}`} key={box.id}>
          <Card title={box.room} className={styles.card}>
            <Progress percent={box.fullness} status="active" />
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default User
