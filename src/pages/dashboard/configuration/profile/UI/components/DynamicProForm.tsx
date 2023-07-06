import { FooterToolbar, ProForm, ProFormInstance } from '@ant-design/pro-components';
import { Button, FormInstance } from 'antd';
import { FC, useRef } from 'react';
import _ from 'lodash';
import { UIDataType } from '../data';
import RGL_UI from './RGL_UI';
import { useModel } from 'umi';
type DynamicProFormProps = {};
const DynamicProForm: FC<DynamicProFormProps> = (props) => {
  const { formRef, editable, setEditable } = useModel('UI');
  return (
    <ProForm
      formRef={formRef}
      request={async (params, props) => {
        const obj = { items: [], layout: [], counter: 0 };
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
      onFinish={async (formData: UIDataType) => {
        formData.items = await Promise.resolve(
          formData.items.map((item, index) => ({
            ...item,
            ...formData.layout[index],
          })),
        );
        console.log(formData);
      }}
    >
      <ProForm.Item noStyle shouldUpdate>
        {(formReF: FormInstance<UIDataType>) => {
          return <RGL_UI formRef={formReF} editable={editable} />;
        }}
      </ProForm.Item>
      {/*  */}
      <ProForm.Item name="items" hidden />
      <ProForm.Item name="layout" hidden />
      <ProForm.Item name="counter" hidden />
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
