import { FC } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { generateRunDOM } from './RunDOMGenerator';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
type RGL_RUN_UIProps = {
  className?: string;
  rowHeight?: number;
  isDraggable?: boolean;
  isResizable?: boolean;
  cols?: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
  };
  items: API.DESIoT_UIDomItems;
};
const RGL_RUN_UI: FC<RGL_RUN_UIProps> = ({ children, items, ...props }) => {
  return (
    <ResponsiveReactGridLayout
      {...props} // WidthProvider option
      measureBeforeMount={true}
      // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
      // and set `measureBeforeMount={true}`.
      useCSSTransforms={false}
      compactType={null}
      preventCollision={true}
      style={{ minHeight: 'calc(100vh - 300px)' }}
    >
      {generateRunDOM(items)}
    </ResponsiveReactGridLayout>
  );
};

RGL_RUN_UI.defaultProps = {
  className: 'layout',
  rowHeight: 50,
  isDraggable: false,
  isResizable: false,
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
};
export default RGL_RUN_UI;
