import { Card, Progress, Statistic } from 'antd'
import React from 'react'
import styles from './boxCard.module.scss'

const BoxCard = () => {
  return (
    <Card title="837263">
      <div className={styles.contentWrapper}>
        <Progress type="circle" percent={75} width={80} />
        <Statistic title="Расположение:" value="Лестница" />
      </div>
    </Card>
  )
}

export default BoxCard
