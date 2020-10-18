import React, { useContext, useEffect } from 'react'
import { Divider, Typography, List, Button } from 'antd'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { HeaderContext } from '../../Authorized'
import { getCall, putCall } from '../callsActions'

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

  return call ? (
    <div>
      <Typography.Title level={4}>{call.building.address}</Typography.Title>
      <Divider>Список контейнеров</Divider>
      <List bordered>
        {call.boxes.forEach(() => (
          <List.Item>Возле лестницы</List.Item>
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
  ) : null
}

export default Call
