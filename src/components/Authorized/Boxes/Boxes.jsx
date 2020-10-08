import React from 'react'
import { Card, Progress, Select, Statistic } from 'antd'
import styles from './boxes.module.scss'

const BoxCard = () => {
  return (
    <Card title="837263">
      <div className={styles.cardContentWrapper}>
        <Progress type="circle" percent={75} width={80} />
        <Statistic title="Расположение:" value="Лестница" />
      </div>
    </Card>
  )
}

const Boxes = () => {
  return (
    <div className={styles.wrapper}>
      <Select
        showSearch
        size="large"
        placeholder="Выберите здание"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option
            ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            : false
        }
      >
        <Select.Option value="Биржевая линия 14-16">
          Биржевая линия 14-16
        </Select.Option>
        <Select.Option value="Ломоносова 9">Ломоносова 9</Select.Option>
        <Select.Option value="Кронверкский проспект 49">
          Кронверкский проспект 49
        </Select.Option>
      </Select>
      <BoxCard />
      <BoxCard />
    </div>
  )
}

export default Boxes
