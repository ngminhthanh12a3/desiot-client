import { FooterToolbar, ProForm, ProFormInstance } from '@ant-design/pro-components';
import { Button, FormInstance } from 'antd';
import { FC, useRef, useState } from 'react';
import RGL from 'react-grid-layout';
import _ from 'lodash';
import { UIDataType } from '../data';
import RGL_UI from './RGL_UI';
type DynamicProFormProps = {
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
};
const DynamicProForm: FC<DynamicProFormProps> = (props) => {
  const formRef = useRef<ProFormInstance<UIDataType>>();
  const { editable, setEditable } = props;
  return (
    <ProForm
      formRef={formRef}
      request={async (params, props) => {
        const obj = { initialLayout: generateLayout() };
        return obj;
      }}
      submitter={{
        render: (props, dom) => (
          <FooterToolbar>
            {editable ? dom : <ToggleEditableBtn onToggleBtnClick={onToggleBtnClick} />}
          </FooterToolbar>
        ),
        onReset() {
          setEditable(false);
        },
        onSubmit() {
          setEditable(false);
        },
        searchConfig: { submitText: 'Save', resetText: 'Cancel' },
      }}
    >
      <ProForm.Item noStyle shouldUpdate>
        {(form: FormInstance<UIDataType>) => {
          return <RGL_UI form={form} editable={editable} />;
        }}
      </ProForm.Item>
    </ProForm>
  );

  function onToggleBtnClick() {
    setEditable(true);
  }
};
function ToggleEditableBtn({
  onToggleBtnClick,
}: {
  onToggleBtnClick: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <Button type="primary" onClick={onToggleBtnClick}>
      Edit
    </Button>
  );
}

export default DynamicProForm;

function generateLayout() {
  return _.map(_.range(0, 5), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
    };
  });
}
