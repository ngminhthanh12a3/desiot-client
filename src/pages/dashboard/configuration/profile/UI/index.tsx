import { Button, Card, Col, Row } from 'antd';
import { FC, useState } from 'react';
import DynamicProForm from './components/DynamicProForm';
import styles from './index.less';

const UI: FC = () => {
  const [editable, setEditable] = useState(false);

  return (
    <div className={styles.editor}>
      <Row className={styles.editorBd}>
        {editable && (
          <Col span={4} className={styles.editorSidebar}>
            {Array.from({ length: 20 }, (v, k) => (
              <Card
                draggable={true}
                // unselectable="on"
                // this is a hack for firefox
                // Firefox requires some kind of initialization
                // which we can do by adding this attribute
                // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}
              >
                Droppable Element (Drag me!)
              </Card>
            ))}
          </Col>
        )}
        <Col span={20} className={styles.editorContent}>
          <DynamicProForm editable={editable} setEditable={setEditable} />
        </Col>
      </Row>
    </div>
  );
};

export default UI;
