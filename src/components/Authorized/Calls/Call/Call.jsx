import React, { useContext, useEffect } from 'react'
import { Divider, Typography, List, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { HeaderContext } from '../../Authorized'
import { getCall, putCall } from '../callsActions'
import { PRIVATE_PATH } from '../../../../config'

const Call = () => {
  const setHeaderProps = useContext(HeaderContext)
  const dispatch = useDispatch()
  const { id } = useParams()
  const { call } = useSelector((state) => state.calls)

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
    await dispatch(putCall(id))
    dispatch(getCall(id))
  }

  if (!call) return null
  return (
    <div style={{ width: `60%`, margin: `auto` }}>
      <Typography.Title level={4}>{call.building.address}</Typography.Title>
      <Divider>Список контейнеров</Divider>
      <List bordered>
        {call.boxes.map((box) => (
          <List.Item key={box.data.id}>
            <Link to={`${PRIVATE_PATH.BOXES}/${box.data.id}`}>
              {box.data.room}
            </Link>
            <Typography.Text>{box.data.box_percent_dropped}%</Typography.Text>
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button
        block
        size="large"
        type="primary"
        disabled={call.is_dropped}
        onClick={handleConfirmDropOff}
      >
        {call.is_dropped ? `Вывоз подтверждён` : `Подтвердить вывоз`}
      </Button>
    </div>
  )
}

export default Call
