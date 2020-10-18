import React, { useContext, useEffect } from 'react'
import { Select } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../Authorized'
import { PRIVATE_PATH } from '../../../config'
import CallCard from './CallCard'
import { getCalls } from './callsActions'

const Calls = () => {
  const dispatch = useDispatch()
  const setHeaderProps = useContext(HeaderContext)
  const { calls } = useSelector((state) => state.calls)

  useEffect(() => {
    setHeaderProps({ title: `Вызовы` })
  }, [setHeaderProps])

  useEffect(() => {
    dispatch(getCalls())
  }, [dispatch])

  return (
    <>
      <Select size="large" placeholder="Выберите здание">
        <Select.Option value="Биржевая линия 14-16">
          Биржевая линия 14-16
        </Select.Option>
        <Select.Option value="Ломоносова 9">Ломоносова 9</Select.Option>
        <Select.Option value="Кронверкский проспект 49">
          Кронверкский проспект 49
        </Select.Option>
      </Select>
      {calls.map((call) => (
        <Link to={`${PRIVATE_PATH.CALLS}/${call.id}`} key={call.id}>
          <CallCard
            time={call.datetime_call}
            isDropped={call.is_dropped}
            address={call.building.address}
          />
        </Link>
      ))}
    </>
  )
}

export default Calls
