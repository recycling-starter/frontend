import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Progress, Button, Divider, Typography } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { HeaderContext } from '../../Authorized'
import styles from './box.module.scss'

const Box = () => {
  const setHeaderProps = useContext(HeaderContext)
  const history = useHistory()
  const [filling, setFilling] = useState(0)

  useEffect(() => {
    const path = history.location.pathname
    setHeaderProps({
      title: path.substr(path.lastIndexOf(`/`) + 1),
      isReturnPossible: true,
    })
  }, [history.location.pathname, setHeaderProps])

  const handleChangeFilling = (delta) => {
    setFilling(Math.max(0, Math.min(100, filling + delta)))
  }

  return (
    <>
      <Typography.Title level={3}>Биржевая 14, лестница</Typography.Title>
      <Divider />
      <Progress
        width="50vw"
        type="circle"
        percent={filling}
        className={styles.circle}
      />
      <Divider />
      <div className={styles.buttons}>
        <Button
          icon={<MinusOutlined />}
          onClick={() => handleChangeFilling(-10)}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={() => handleChangeFilling(10)}
        />
      </div>
      <p className={styles.text}>Изменение заполненности контейнера</p>
    </>
  )
}

export default Box
