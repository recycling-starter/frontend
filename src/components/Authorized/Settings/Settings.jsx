import React, { useContext, useEffect } from 'react'
import { HeaderContext } from '../Authorized'

const Settings = () => {
  const setHeaderProps = useContext(HeaderContext)

  useEffect(() => {
    setHeaderProps({ title: `Настройки` })
  }, [setHeaderProps])

  return <p>asdasdasd</p>
}

export default Settings
