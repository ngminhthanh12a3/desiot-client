import { FormInstance } from 'antd';
import RGL, { Layout, WidthProvider, Responsive, Layouts } from 'react-grid-layout';

export type UIDataType = API.DESIoTUIDataType;

export type UIProps = {
  className: string;
  rowHeight: number;
  onLayoutChange(currentLayout: RGL.Layout[], allLayouts: RGL.Layouts): void;
  cols: {
    [key in 'lg' | 'md' | 'sm' | 'xs' | 'xxs']: number;
  };
};

//
export type RGL_UIProps = {
  formRef: FormInstance<UIDataType>;
  editable: boolean;
  onLayoutChange?(currentLayout: RGL.Layout[], allLayouts: RGL.Layouts): void;
  className?: string;
  rowHeight?: number;
};

export type UIDashboardProps = {
  config_id: string;
  ui_id: string;
};
