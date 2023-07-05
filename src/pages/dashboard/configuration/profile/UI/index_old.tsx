import { FooterToolbar, ProForm, ProFormInstance } from '@ant-design/pro-components';
import { FC, useRef, useState } from 'react';
import _ from 'lodash';
import RGL from 'react-grid-layout';
import UI_RGL from './components/UI_RGL';
import { UIDataType, UIProps } from './data';
import { Button, FormInstance } from 'antd';

const UI: FC<UIProps> = (props) => {
  const [editable, setEditable] = useState(false);
  const formRef = useRef<ProFormInstance<UIDataType>>();
  return (
    <ProForm<UIDataType>
      formRef={formRef}
      request={async (params, props) => ({ initialLayout: generateLayout() })}
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
          return (
            <UI_RGL
              {...props}
              //   initialLayout={form.getFieldValue('initialLayout')}
              form={form}
              isDraggable={editable}
              isResizable={editable}
              editable={editable}
            />
          );
        }}
      </ProForm.Item>
    </ProForm>
  );
  function generateLayout() {
    return _.map(_.range(0, 3), function (item, i) {
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
  function onToggleBtnClick() {
    setEditable(true);
  }
};

UI.defaultProps = {
  className: 'layout',
  rowHeight: 30,
  cols: {
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2,
  },
  onLayoutChange: function (currentLayout: RGL.Layout[], allLayouts: RGL.Layouts) {
    // console.log(currentLayout, allLayouts);
  },
};

export default UI;

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
