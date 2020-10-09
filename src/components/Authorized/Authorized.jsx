import React, { useState } from 'react'
import { Drawer, Menu, PageHeader } from 'antd'
import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './authorized.module.scss'

export const HeaderContext = React.createContext({})

const Authorized = (props) => {
  const { children, setAuthorized } = props
  const [showDrawer, setShowDrawer] = useState(false)
  const [headerProps, setHeaderProps] = useState({
    title: ``,
  })
  const { title, isReturnPossible } = headerProps

  return (
    <>
      <PageHeader
        title={title}
        backIcon={
          isReturnPossible ? (
            <Link to=".." style={{ color: `inherit` }}>
              <ArrowLeftOutlined />
            </Link>
          ) : (
            <MenuOutlined />
          )
        }
        onBack={isReturnPossible ? () => null : () => setShowDrawer(true)}
      />
      <Drawer
        title="Администратор"
        placement="left"
        closable={false}
        visible={showDrawer}
        bodyStyle={{ padding: 0 }}
        onClose={() => setShowDrawer(false)}
      >
        <Menu selectedKeys={[`boxes`]}>
          <Menu.Item key="boxes">Контейнеры</Menu.Item>
          <Menu.Item key="users">Пользователи</Menu.Item>
          <Menu.Item key="settings">Настройки</Menu.Item>
          <Menu.Item key="calls">Вызовы</Menu.Item>
          <Menu.Item key="logout" onClick={() => setAuthorized(false)}>
            Выход
          </Menu.Item>
        </Menu>
      </Drawer>
      <div className={styles.wrapper}>
        <HeaderContext.Provider value={setHeaderProps}>
          {children}
        </HeaderContext.Provider>
      </div>
    </>
  )
}

Authorized.propTypes = {
  children: PropTypes.element,
  setAuthorized: PropTypes.func,
}

export default Authorized
