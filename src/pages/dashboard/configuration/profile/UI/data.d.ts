import { FormInstance } from 'antd';
import RGL, { Layout, WidthProvider, Responsive, Layouts } from 'react-grid-layout';

export type UIDataType = {
  initialLayout: {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
  }[];
};

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
  form: FormInstance<UIDataType>;
  editable: boolean;
  onLayoutChange?(currentLayout: RGL.Layout[], allLayouts: RGL.Layouts): void;
  className?: string;
  rowHeight?: number;
  cols?: { [size in 'lg' | 'md' | 'sm' | 'xs' | 'xxs']: number };
};
