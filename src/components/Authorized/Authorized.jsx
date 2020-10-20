import React, { useState, useEffect } from 'react'
import { Drawer, PageHeader, Typography } from 'antd'
import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { getBuildings } from '../Unauthorized/unauthorizedActions'
import Menu from './Menu'
import styles from './authorized.module.scss'

export const HeaderContext = React.createContext({})

const Authorized = (props) => {
  const { children } = props
  const dispatch = useDispatch()
  const [showDrawer, setShowDrawer] = useState(false)
  const [headerProps, setHeaderProps] = useState({ title: `` })
  const isDesktop = useMediaQuery({ minDeviceWidth: 1224 })
  const { title, isReturnPossible } = headerProps
  const { isAdmin, name } = useSelector((state) => state.session)

  useEffect(() => {
    dispatch(getBuildings())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <PageHeader
        title={title}
        className={styles.header}
        backIcon={
          isReturnPossible ? (
            <Link to="." style={{ color: `inherit` }}>
              <ArrowLeftOutlined />
            </Link>
          ) : (
            !isDesktop && <MenuOutlined />
          )
        }
        extra={
          isDesktop && (
            <Typography.Text className={styles.text}>{name}</Typography.Text>
          )
        }
        onBack={
          isReturnPossible
            ? () => null
            : () => !isDesktop && setShowDrawer(true)
        }
      />
      {isDesktop ? (
        <Menu setShowDrawer={setShowDrawer} isAdmin={isAdmin} />
      ) : (
        <Drawer
          title={name}
          placement="left"
          closable={false}
          visible={showDrawer}
          bodyStyle={{ padding: 0 }}
          onClose={() => setShowDrawer(false)}
        >
          <Menu setShowDrawer={setShowDrawer} isAdmin={isAdmin} />
        </Drawer>
      )}
      <div className={styles.wrapper}>
        <HeaderContext.Provider value={setHeaderProps}>
          {children}
        </HeaderContext.Provider>
      </div>
    </div>
  )
}

Authorized.propTypes = {
  children: PropTypes.element,
  setAuthorized: PropTypes.func,
}

export default Authorized
