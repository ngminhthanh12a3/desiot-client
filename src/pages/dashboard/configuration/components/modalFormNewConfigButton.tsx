import { PlusOutlined } from "@ant-design/icons";
import { ProForm, ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { ModalFormNewConfig } from "../data";
import { createNewConfig } from "../service";
import styles from '../style.less'

const ModalFormNewConfigButton = () => {
    const [form] = Form.useForm<ModalFormNewConfig>();
    return <ModalForm<ModalFormNewConfig> 
        title="New Configuration"
        trigger={<Button type="dashed" className={styles.newButton}>
        <PlusOutlined /> New Configuration
      </Button>}
      form={form}
      autoFocusFirstInput
      modalProps={{destroyOnClose: true, onCancel : () => console.log('run')}}
      submitTimeout={2000}
      onFinish={async (values) => {
        const {type='error', content='Unknown result!'} = await createNewConfig(values);
        message[type](content);
        return true;
      }}

    >
        <ProForm.Group>
            <ProFormText
            name="name"
            label="NAME"
            placeholder="Name"
            width="lg"
            required
            />
        </ProForm.Group>
    </ModalForm>
}

export default ModalFormNewConfigButton