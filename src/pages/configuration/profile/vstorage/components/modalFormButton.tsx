import { rule } from '@/pages/dashboard/configuration/profile/vstorage/service';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  RequestOptionsType,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import { FC } from 'react';
import { ModalFormButtonType, TableListItem } from '../data';

const ModalFormButton: FC<ModalFormButtonType> = ({ onModalFormFinish, config_id }) => {
  const [form] = Form.useForm<TableListItem>();
  const VSIDOptionRun = async () => {
    const VSIDOptions: RequestOptionsType[] = Array.from({ length: 32 }, (_, k) => ({
      value: k,
      label: `VS${k}`,
      disabled: false,
    }));
    const VSIDOfTheConfig = await rule({ config_id });
    await VSIDOfTheConfig.data.forEach((vsmodel) => {
      VSIDOptions[vsmodel.vs_id].disabled = true;
    });

    return VSIDOptions;
  };
  return (
    <ModalForm
      title="Add Virtual Storage"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Add Virtual Storage
        </Button>
      }
      initialValues={{
        config_id,
      }}
      form={form}
      autoFocusFirstInput
      modalProps={{ destroyOnClose: true }}
      submitTimeout={2000}
      onFinish={async (values) => onModalFormFinish(values)}
    >
      <ProFormText
        name="name"
        label="Name"
        placeholder="Virtual Storage Name"
        rules={[
          {
            required: true,
            message: 'Please type virtual storage name!',
          },
        ]}
      />
      <ProForm.Group>
        <ProFormSelect
          name="type"
          label="Data type"
          placeholder="Data type"
          options={[
            {
              value: 0,
              label: 'Integer',
            },
            {
              value: 1,
              label: 'Float',
            },
            {
              value: 2,
              label: 'String',
            },
          ]}
          rules={[
            {
              required: true,
              message: 'Please select type of virtual storage!',
            },
          ]}
          width="md"
        />
        <ProFormSelect
          name="vs_id"
          label="Virtual Storage ID"
          placeholder="Virtual Storage ID"
          // options={VSIDOptions}
          request={async () => await VSIDOptionRun()}
          rules={[
            {
              required: true,
              message: 'Please select id of virtual storage!',
            },
          ]}
          width="md"
        />
      </ProForm.Group>
      <ProForm.Item name="config_id" hidden />
    </ModalForm>
  );
};

export default ModalFormButton;
