import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Typography, Menu as AntdMenu } from 'antd'
import { useDispatch } from 'react-redux'
import { PRIVATE_PATH } from '../../../config'
import styles from '../authorized.module.scss'
import { logout } from '../../Unauthorized/unauthorizedActions'

const Menu = (props) => {
  const { isAdmin, setShowDrawer } = props
  const dispatch = useDispatch()
  const path = useLocation().pathname

  return (
    <AntdMenu
      defaultSelectedKeys={[path.substr(path.lastIndexOf(`/`) + 1)]}
      mode="inline"
    >
      <AntdMenu.Item key="boxes">
        <Link to={PRIVATE_PATH.BOXES} onClick={() => setShowDrawer(false)}>
          Контейнеры
        </Link>
      </AntdMenu.Item>
      {isAdmin && (
        <>
          <AntdMenu.Item key="create_box">
            <Link
              to={PRIVATE_PATH.CREATE_BOX}
              onClick={() => setShowDrawer(false)}
            >
              Создать контейнер
            </Link>
          </AntdMenu.Item>
          <AntdMenu.Item key="users">
            <Link to={PRIVATE_PATH.USERS} onClick={() => setShowDrawer(false)}>
              Пользователи
            </Link>
          </AntdMenu.Item>
          <AntdMenu.Item key="calls">
            <Link to={PRIVATE_PATH.CALLS} onClick={() => setShowDrawer(false)}>
              Вызовы
            </Link>
          </AntdMenu.Item>
        </>
      )}
      <AntdMenu.Item key="settings">
        <Link to={PRIVATE_PATH.SETTINGS} onClick={() => setShowDrawer(false)}>
          Настройки
        </Link>
      </AntdMenu.Item>
      <AntdMenu.Item
        key="logout"
        className={styles.logout}
        onClick={() => dispatch(logout())}
      >
        <Typography.Text type="danger">Выход</Typography.Text>
      </AntdMenu.Item>
    </AntdMenu>
  )
}

export default Menu
