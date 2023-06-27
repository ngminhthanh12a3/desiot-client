import { PlusOutlined } from "@ant-design/icons"
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components"
import { Button, Form } from "antd"
import { FC } from "react"
import { TableListItem } from "../data"

type ModalFormButtonType = {
    OnMFAddingDevFinish(formData: TableListItem): boolean}
const ModalFormButton: FC<ModalFormButtonType> = ({OnMFAddingDevFinish}) => {
    const [form] = Form.useForm<TableListItem>();
    return <ModalForm
     title="Add device"
     trigger={<Button type="primary">
        <PlusOutlined/>
        Add device
     </Button>}
     form={form}
     autoFocusFirstInput
     modalProps={{destroyOnClose: true,}}
     submitTimeout={2000}
     onFinish={async (values) => OnMFAddingDevFinish(values)}
    >
        <ProForm.Group>
            <ProFormText
                name="name"
                label="Name"
                placeholder="Device Name"
                required={true}
            />
        </ProForm.Group>
    </ModalForm>
}

export default ModalFormButton