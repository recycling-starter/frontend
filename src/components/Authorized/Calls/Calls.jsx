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

  const sortByDate = (a, b) => {
    if (a.is_dropped !== b.is_dropped) return a.is_dropped - b.is_dropped
    else
      return (
        new Date(b.datetime_call).getTime() -
        new Date(a.datetime_call).getTime()
      )
  }

  return (
    <>
      {calls.sort(sortByDate).map((call) => (
        <Link
          to={`${PRIVATE_PATH.CALLS}/${call.id}`}
          key={call.id}
          style={{ gridArea: `auto` }}
        >
          <CallCard
            time={call.datetime_call}
            isDropped={call.datetime_dropoff}
            address={call.building.address}
            error={!call.is_sent}
          />
        </Link>
      ))}
    </>
  )
}

export default Calls
