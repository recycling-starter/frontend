import React, { useEffect, useContext, useState } from 'react'
import { Select } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../Authorized'
import { PRIVATE_PATH } from '../../../config'
import BoxCard from './BoxCard'
import { getBoxes } from './boxesActions'

const Boxes = () => {
  const dispatch = useDispatch()
  const setHeaderProps = useContext(HeaderContext)
  const { buildings, organization, isAdmin } = useSelector(
    (state) => state.session,
  )
  const { boxes } = useSelector((state) => state.boxes)
  const [building, setBuilding] = useState(null)

  useEffect(() => {
    setHeaderProps({ title: `Контейнеры` })
  }, [setHeaderProps])

  useEffect(() => {
    dispatch(getBoxes({ building, organization }))
  }, [dispatch, building, organization])

  return (
    <>
      {isAdmin && (
        <Select
          size="large"
          placeholder="Выберите здание"
          onChange={(building) => setBuilding(building)}
        >
          {buildings.map((building) => (
            <Select.Option value={building.id} key={building.id}>
              {building.address}
            </Select.Option>
          ))}
        </Select>
      )}
      {boxes
        .sort((a, b) => a.id - b.id)
        .map((box) => (
          <Link
            to={`${PRIVATE_PATH.BOXES}/${box.id}`}
            key={box.id}
            style={isAdmin ? {} : { gridArea: `auto` }}
          >
            <BoxCard fullness={box.fullness} room={box.room} id={box.id} />
          </Link>
        ))}
    </>
  )
}

export default Boxes
