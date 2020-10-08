import React, { useState } from 'react'
import { Drawer, Menu, PageHeader } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import styles from './authorized.module.scss'

const Authorized = (props) => {
  const { children, setAuthorized } = props
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <>
      <PageHeader
        title="Контейнеры"
        backIcon={<MenuOutlined />}
        onBack={() => setShowDrawer(true)}
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
      <div className={styles.wrapper}>{children}</div>
    </>
  )
}

Authorized.propTypes = {
  children: PropTypes.node,
  setAuthorized: PropTypes.func,
}

export default Authorized
