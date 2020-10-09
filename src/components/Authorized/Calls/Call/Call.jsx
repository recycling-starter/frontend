import React, { useContext, useEffect } from 'react'
import { Divider, Typography, List } from 'antd'
import { HeaderContext } from '../../Authorized'

const Call = () => {
  const setHeaderProps = useContext(HeaderContext)

  useEffect(() => {
    setHeaderProps({
      title: `Вызов от 09.10.2020`,
      isReturnPossible: true,
    })
  }, [setHeaderProps])

  return (
    <div>
      <Typography.Title level={4}>Биржевая 14</Typography.Title>
      <Divider>Список контейнеров</Divider>
      <List bordered>
        <List.Item>Возле лестницы</List.Item>
        <List.Item>Возле кухни</List.Item>
        <List.Item>Возле туалета</List.Item>
        <List.Item>Возле чего-то ещё</List.Item>
      </List>
    </div>
  )
}

export default Call
