import { Card, Progress, Statistic } from 'antd'
import React from 'react'
import styles from './boxCard.module.scss'

const BoxCard = (props) => {
  const { fullness, room, id } = props
  return (
    <Card title={id}>
      <div className={styles.contentWrapper}>
        <Progress type="circle" percent={fullness} width={80} />
        <Statistic title="Расположение:" value={room} />
      </div>
    </Card>
  )
}

export default BoxCard
