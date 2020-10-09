import React, { useState } from 'react'
import { Drawer, Menu, PageHeader, Typography } from 'antd'
import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { PRIVATE_PATH } from '../../config'
import styles from './authorized.module.scss'

export const HeaderContext = React.createContext({})

const Authorized = (props) => {
  const { children, setAuthorized } = props
  const [showDrawer, setShowDrawer] = useState(false)
  const [headerProps, setHeaderProps] = useState({
    title: ``,
  })
  const path = useHistory().location.pathname
  const { title, isReturnPossible } = headerProps

  return (
    <>
      <PageHeader
        title={title}
        backIcon={
          isReturnPossible ? (
            <Link to="." style={{ color: `inherit` }}>
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
        <Menu defaultSelectedKeys={[path.substr(path.lastIndexOf(`/`) + 1)]}>
          <Menu.Item key="boxes">
            <Link to={PRIVATE_PATH.BOXES} onClick={() => setShowDrawer(false)}>
              Контейнеры
            </Link>
          </Menu.Item>
          <Menu.Item key="users">
            <Link to={PRIVATE_PATH.USERS} onClick={() => setShowDrawer(false)}>
              Пользователи
            </Link>
          </Menu.Item>
          <Menu.Item key="settings">
            <Link
              to={PRIVATE_PATH.SETTINGS}
              onClick={() => setShowDrawer(false)}
            >
              Настройки
            </Link>
          </Menu.Item>
          <Menu.Item key="calls">
            <Link to={PRIVATE_PATH.CALLS} onClick={() => setShowDrawer(false)}>
              Вызовы
            </Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            className={styles.logout}
            onClick={() => {
              setShowDrawer(false)
              setAuthorized(false)
            }}
          >
            <Typography.Text type="danger">Выход</Typography.Text>
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