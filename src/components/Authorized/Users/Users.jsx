import React, { useEffect, useContext, useState } from 'react'
import { Select } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../Authorized'
import { PRIVATE_PATH } from '../../../config'
import UserCard from './UserCard'
import { getUsers } from './usersActions'

const declOfNum = (number, words) =>
  words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
  ]

const Users = () => {
  const dispatch = useDispatch()
  const setHeaderProps = useContext(HeaderContext)
  const { buildings, organization } = useSelector((state) => state.session)
  const { users } = useSelector((state) => state.users)
  const [building, setBuilding] = useState(null)

  useEffect(() => {
    setHeaderProps({ title: `Пользователи` })
  }, [setHeaderProps])

  useEffect(() => {
    dispatch(getUsers({ building, organization }))
  }, [dispatch, building, organization])

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
        {buildings.map((optionBuilding) => (
          <Select.Option value={optionBuilding.id} key={optionBuilding.id}>
            {optionBuilding.address}
            {building === optionBuilding.id &&
              users.length &&
              ` – ${users.length} ${declOfNum(users.length, [
                `пользователь`,
                `пользователя`,
                `пользователей`,
              ])}`}
          </Select.Option>
        ))}
      </Select>
      {users
        .sort((a, b) => b.is_active - a.is_active)
        .map((user) => (
          <Link to={`${PRIVATE_PATH.USERS}/${user.id}`} key={user.id}>
            <UserCard
              room={user.room}
              email={user.email}
              name={user.first_name}
              phone={user.phone}
              building={getBuildingAddress(user.building)}
              isAdmin={!!user.organization}
              disabled={!user.is_active}
            />
          </Link>
        ))}
    </>
  )
}

export default Users
