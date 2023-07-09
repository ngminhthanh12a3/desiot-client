import { Button, Card, Col, Row } from 'antd';
import { FC, useState } from 'react';
import { useModel } from 'umi';
import DynamicProForm from './components/DynamicProForm';
import UIToolbox from './components/UIToolbox';
import styles from './index.less';

const UI: FC = () => {
  const { editable, setEditable } = useModel('UI');

  return (
    <div className={styles.editor}>
      <Row className={styles.editorBd}>
        {editable && (
          <Col span={4} className={styles.editorSidebar}>
            <UIToolbox />
          </Col>
        )}
        <Col span={editable ? 20 : 24} className={styles.editorContent}>
          <DynamicProForm />
        </Col>
      </Row>
    </div>
  );
};

export default UI;
