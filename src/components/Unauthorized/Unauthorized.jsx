import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { PageHeader, Tabs } from 'antd'
import { PUBLIC_PATH } from '../../config'
import styles from './unauthorized.module.scss'
import Logo from './assets/logo.png'

export const HeaderContext = React.createContext({})

const Unauthorized = (props) => {
  const { children } = props
  const path = useLocation().pathname
  const history = useHistory()
  const [headerProps, setHeaderProps] = useState({
    title: ``,
    tab: `login`,
  })
  const { title } = headerProps

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
          <Tabs
            defaultActiveKey={path.replace(/\//g, ``)}
            size="small"
            onChange={(activeKey) =>
              history.push(
                activeKey === `login`
                  ? PUBLIC_PATH.LOGIN
                  : PUBLIC_PATH.REGISTRATION,
              )
            }
          >
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
