import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { PageHeader, Tabs } from 'antd'
import styles from './unauthorized.module.scss'
import Logo from './assets/logo.png'
import { PUBLIC_PATH } from '../../config'

export const HeaderContext = React.createContext({})

const Unauthorized = (props) => {
  const { children } = props
  const path = useLocation().pathname
  const [headerProps, setHeaderProps] = useState({
    title: ``,
    tab: `login`,
  })
  const { title, tab } = headerProps

  return (
    <>
      <PageHeader
        title={title}
        avatar={{ src: Logo }}
        className={styles.header}
        backIcon={
          <Link to="." style={{ color: `inherit` }}>
            <ArrowLeftOutlined />
          </Link>
        }
        extra={
          <Tabs defaultActiveKey={path.replace(/\//g, ``)} size="small">
            <Tabs.TabPane
              tab={
                <Link to={PUBLIC_PATH.LOGIN} className={styles.link}>
                  Вход
                </Link>
              }
              key="login"
            />
            <Tabs.TabPane
              tab={
                <Link to={PUBLIC_PATH.REGISTRATION} className={styles.link}>
                  Регистрация
                </Link>
              }
              key="registration"
            />
          </Tabs>
        }
      />
      <div className={styles.wrapper}>
        <HeaderContext.Provider value={setHeaderProps}>
          {children}
        </HeaderContext.Provider>
      </div>
    </>
  )
}

export default Unauthorized
