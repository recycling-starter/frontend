import React, { useContext, useEffect, useState } from 'react'
import { Divider, Typography, List, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { HeaderContext } from '../../Authorized'
import { getCall, putCall } from '../callsActions'
import { PRIVATE_PATH } from '../../../../config'
import styles from '../../Users/User/user.module.scss'

const Call = () => {
  const setHeaderProps = useContext(HeaderContext)
  const dispatch = useDispatch()
  const { id } = useParams()
  const { call } = useSelector((state) => state.calls)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setHeaderProps({
      title:
        call && `Вызов от ${moment(call.datetime_call).format(`DD.MM.YYYY`)}`,
      isReturnPossible: true,
    })
  }, [call, setHeaderProps])

  useEffect(() => {
    dispatch(getCall(id))
  }, [dispatch, id])

  const handleConfirmDropOff = async () => {
    setLoading(true)
    await dispatch(putCall(id))
    await dispatch(getCall(id))
    setLoading(false)
  }

  if (!call) return null
  return (
    <div className={styles.wrapper}>
      <Typography.Title level={4}>{call.building.address}</Typography.Title>
      <Divider>Список контейнеров</Divider>
      <List bordered>
        {call.boxes.map((box) => (
          <List.Item key={box.data.id}>
            <Link
              to={`${PRIVATE_PATH.BOXES}/${box.data.id}`}
              style={{ color: !call.is_sent && `#f5222d` }}
            >
              {box.data.room}
            </Link>
            <Typography.Text>{box.data.box_percent_dropped}%</Typography.Text>
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button
        block
        danger={!call.is_sent}
        size="large"
        type={call.is_sent && `primary`}
        disabled={call.datetime_dropoff}
        loading={loading}
        onClick={handleConfirmDropOff}
      >
        {call.datetime_dropoff ? `Вывоз подтверждён` : `Подтвердить вывоз`}
      </Button>
    </div>
  )
}

export default Call
