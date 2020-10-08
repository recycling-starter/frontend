import React, { useState } from 'react'
import { Drawer, Menu, PageHeader } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import styles from './authorized.module.scss'

interface Props {
  children: React.ReactNode
  setAuthorized: (authorized: boolean) => void
}

const Authorized = (props: Props) => {
  const { children, setAuthorized } = props
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <>
      <PageHeader
        title="Контейнеры"
        onBack={() => setShowDrawer(true)}
        backIcon={<MenuOutlined />}
      />
      <Drawer
        title="Администратор"
        placement="left"
        closable={false}
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
        bodyStyle={{ padding: 0 }}
      >
        <Menu selectedKeys={['boxes']}>
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

export default Authorized
