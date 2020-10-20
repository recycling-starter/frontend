import React, { useContext, useEffect } from 'react'
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
      {calls.map((call) => (
        <Link
          to={`${PRIVATE_PATH.CALLS}/${call.id}`}
          key={call.id}
          style={{ gridArea: `auto` }}
        >
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
