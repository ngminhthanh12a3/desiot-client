import { PageContainer } from "@ant-design/pro-layout"
import {  Card, List } from "antd"
import { FC } from "react"
import { history, useRequest } from "umi"
import ModalFormNewConfigButton from "./components/modalFormNewConfigButton"
import type { CardListItemDataType, ModalFormNewConfig } from "./data"
import { createNewConfig, loadAllConfig } from "./service"
import styles from "./style.less"

const onCardListItemClick = (item: Partial<CardListItemDataType>) => {
  history.push(window.location.pathname + `/${item._id}`)
}

const ConfigurationPage: FC = () => {
    const {loading, data=[], mutate} = useRequest(loadAllConfig)
    const {run: postRun} = useRequest(createNewConfig, {manual: true, onSuccess(res) {
      mutate((oldData) => [...oldData, res])
    },})
    const nullData: Partial<CardListItemDataType> = {};
    const handleSubmit = (values:ModalFormNewConfig) => {
      postRun(values)
      return true
    }
    return <PageContainer>
        <div className={styles.cardList}>
            <List<Partial<CardListItemDataType>>
                rowKey="_id"
                loading={loading}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                  }}
                dataSource={[nullData, ...data]}
                renderItem={(item) => {
                    if (item && item._id) {
                      return (
                        <List.Item key={item._id} onClick={() => onCardListItemClick(item)}>
                          <Card
                            hoverable
                            className={styles.card}
                            cover={<img style={{padding:'20px'}} width="100" height="100" src="https://img.icons8.com/ios/100/administrative-tools.png" alt="administrative-tools"/>}
                            
                          >
                            <Card.Meta
                  
                              title={<a>{item.name}</a>}
                            />
                          </Card>
                        </List.Item>
                      );
                    }
                    return (
                      <List.Item>
                        <ModalFormNewConfigButton handleSubmit={handleSubmit} />
                      </List.Item>
                    );
                  }}
                />
                
        </div>
    </PageContainer>
}

export default ConfigurationPage