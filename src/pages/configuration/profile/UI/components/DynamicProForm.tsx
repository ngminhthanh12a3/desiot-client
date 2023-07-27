import { FooterToolbar, ProForm } from '@ant-design/pro-components';
import { Button, FormInstance } from 'antd';
import { FC } from 'react';
import _ from 'lodash';
import { UIDataType } from '../data';
import RGL_UI from './RGL_UI';
import { history, useModel, useRequest } from 'umi';
type DynamicProFormProps = {
  editable: boolean;
  UIDataReqRun: (...args: any) => Promise<API.DESIoTUIDataType>;
  updateUIDashboardPre?: (params: Partial<API.DESIoTUIDataType>) => void;
};

type UIDynamicFormRes = API.DESIoTUIDataType;
const DynamicProForm: FC<DynamicProFormProps> = (props) => {
  const { formRef } = useModel('UI');
  const { editable, UIDataReqRun, updateUIDashboardPre } = props;
  const {} = useRequest;
  return (
    <ProForm
      formRef={formRef}
      request={UIDataReqRun}
      submitter={{
        render: (props, dom) => (
          <FooterToolbar>
            {editable ? <>{dom}</> : <ToggleEditableBtn onToggleBtnClick={onToggleBtnClick} />}
          </FooterToolbar>
        ),
        onReset() {
          const readOnlyPathname = history.location.pathname.replace('/edit', '');
          history.push(readOnlyPathname);
        },
        onSubmit() {},
        // resetButtonProps: false,
        searchConfig: { submitText: 'Save', resetText: 'Cancel' },
      }}
      onFinish={async (formData: UIDataType) => {
        formData.items = await Promise.resolve(
          formData.items.map((item, index) => ({
            ...item,
            ...formData.layout[index],
          })),
        );
        const { layout, ...restData } = formData;
        updateUIDashboardPre && updateUIDashboardPre(restData);
        return true;
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
    history.push(history.location.pathname + '/edit');
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
