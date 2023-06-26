import { PlusOutlined } from "@ant-design/icons"
import { PageContainer } from "@ant-design/pro-layout"
import { Button, Card, List } from "antd"
import { FC } from "react"
import { useRequest } from "umi"
import ModalFormNewConfigButton from "./components/modalFormNewConfigButton"
import { CardListItemDataType } from "./data"
import { loadAllConfig } from "./service"
import styles from "./style.less"

const ConfigurationPage: FC = () => {
    const {loading} = useRequest(loadAllConfig)
    const nullData: Partial<CardListItemDataType> = {};
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
                dataSource={[nullData]}
                renderItem={(item) => {
                    if (item && item._id) {
                      return (
                        <List.Item key={item._id}>
                          <Card
                            hoverable
                            className={styles.card}
                          >
                            <Card.Meta
                            //   avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                              title={<a>{item.name}</a>}
                            //   description={
                            //     <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                            //       {item.description}
                            //     </Paragraph>
                            //   }
                            />
                          </Card>
                        </List.Item>
                      );
                    }
                    return (
                      <List.Item>
                        <ModalFormNewConfigButton/>
                      </List.Item>
                    );
                  }}
                />
                
        </div>
    </PageContainer>
}

export default ConfigurationPage