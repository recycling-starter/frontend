import React, { useEffect, useContext, useState } from 'react'
import { Select } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../Authorized'
import UserCard from './UserCard'
import { getUsers } from './usersActions'

const Users = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const setHeaderProps = useContext(HeaderContext)
  const { buildings } = useSelector((state) => state.session)
  const { users } = useSelector((state) => state.users)
  const [building, setBuilding] = useState(null)

  useEffect(() => {
    setHeaderProps({ title: `Пользователи` })
  }, [setHeaderProps])

  useEffect(() => {
    dispatch(getUsers(building))
  }, [dispatch, building])

  const getBuildingAddress = (id) => {
    const building = buildings.find((building) => building.id === id)
    return building && building.address
  }

  return (
    <>
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
      {users.map((user, index) => (
        <Link to={`${history.location.pathname}/${index + 1}`} key={index}>
          <UserCard
            room={user.room}
            email={user.email}
            name={user.first_name}
            building={getBuildingAddress(user.building)}
          />
        </Link>
      ))}
    </>
  )
}

export default Users
