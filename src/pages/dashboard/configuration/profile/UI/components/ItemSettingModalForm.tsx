import { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  RequestOptionsType,
} from '@ant-design/pro-components';
import { useModel } from 'umi';
const ItemSettingModalForm: FC<{
  run: () => Promise<RequestOptionsType[]>;
}> = ({ run }) => {
  const { modalFormOpen, setmodalFormOpen, setingItem, UIUpdateItem } = useModel('UI');

  return (
    <ModalForm<{
      config: {
        title: string;
        vs_id: string;
      };
    }>
      title="UI Setting"
      open={modalFormOpen}
      onOpenChange={setmodalFormOpen}
      initialValues={setingItem && setingItem}
      onFinish={async (formData) => {
        setingItem && UIUpdateItem(setingItem, formData);
        return true;
      }}
    >
      <ProFormText name={['config', 'title']} label="Title" />
      <ProFormSelect
        name={['config', 'vs_id']}
        label="Virtual Storage"
        showSearch
        debounceTime={300}
        placeholder="Select a Virtual Storage"
        request={async () => await run()}
      />
    </ModalForm>
  );
};
export default ItemSettingModalForm;
