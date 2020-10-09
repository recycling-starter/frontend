import React, { useEffect, useContext } from 'react'
import { Select } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { HeaderContext } from '../Authorized'
import BoxCard from './BoxCard'

const Boxes = () => {
  const history = useHistory()
  const setHeaderProps = useContext(HeaderContext)

  useEffect(() => {
    setHeaderProps({ title: `Контейнеры` })
  }, [setHeaderProps])

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
      <Link to={`${history.location.pathname}/837263`}>
        <BoxCard />
      </Link>
      <Link to={`${history.location.pathname}/837263`}>
        <BoxCard />
      </Link>
    </>
  )
}

export default Boxes