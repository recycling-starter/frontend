import React, { useEffect, useContext, useState } from 'react'
import { Select } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../Authorized'
import { PRIVATE_PATH } from '../../../config'
import UserCard from './UserCard'
import { getUsers } from './usersActions'

const Users = () => {
  const dispatch = useDispatch()
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
      {users.map((user) => (
        <Link to={`${PRIVATE_PATH.USERS}/${user.id}`} key={user.id}>
          <UserCard
            room={user.room}
            email={user.email}
            name={user.first_name}
            building={getBuildingAddress(user.building)}
            isAdmin={!!user.organization}
          />
        </Link>
      ))}
    </>
  )
}

export default Users
