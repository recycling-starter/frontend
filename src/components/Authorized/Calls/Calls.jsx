import React, { useContext, useEffect } from 'react'
import { HeaderContext } from '../Authorized'
import { Card, Select, Typography } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import CallCard from './CallCard'

const Calls = () => {
  const history = useHistory()
  const setHeaderProps = useContext(HeaderContext)

  useEffect(() => {
    setHeaderProps({ title: `Вызовы` })
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
        <CallCard />
      </Link>
    </>
  )
}

export default Calls
