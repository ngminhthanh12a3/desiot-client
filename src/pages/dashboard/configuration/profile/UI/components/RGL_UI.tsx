import { FC, useRef, useState } from 'react';
import _ from 'lodash';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';
import { RGL_UIProps } from '../data';
import { useModel } from 'umi';
import { DESIoT_AdditionalAttsOfDroppingItem, DESIoT_ItemDefaultConfig } from '@/constants';
import { generateEditaleDOM } from './DOMGenerators';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const RGL_UI: FC<RGL_UIProps> = ({ formRef, ...props }) => {
  const { droppingItem, UIAddItem } = useModel('UI');
  const { getFieldValue, setFieldValue } = formRef;
  const [, setCurrentBreakpoint] = useState('lg');
  const [cols, setCols] = useState({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 });
  const RRGLRef = useRef<any>();

  // const itemCounter = useRef<number>(getFieldValue('items').length || 0);
  return (
    <ResponsiveReactGridLayout
      {...props}
      // layouts={layouts}
      onBreakpointChange={onBreakpointChange}
      onLayoutChange={onLayoutChange}
      // WidthProvider option
      measureBeforeMount={true}
      // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
      // and set `measureBeforeMount={true}`.
      useCSSTransforms={false}
      compactType={null}
      preventCollision={true}
      isDraggable={props.editable}
      isResizable={props.editable}
      isDroppable={props.editable}
      onDrop={onDrop}
      droppingItem={droppingItem}
      ref={RRGLRef}
      style={{ minHeight: 'calc(100vh - 300px)' }}
      {...{ cols }}
    >
      {generateEditaleDOM(getFieldValue('items'), props.editable)}
    </ResponsiveReactGridLayout>
  );

  function onBreakpointChange(newBreakpoint: string, newCols: number) {
    setCurrentBreakpoint(newBreakpoint);
    setCols((preCols) => ({ ...preCols, [newBreakpoint]: newCols }));
  }
  function onLayoutChange(currentLayout: RGL.Layout[], allLayouts: RGL.Layouts) {
    props.onLayoutChange && props.onLayoutChange(currentLayout, allLayouts);
    setFieldValue('layout', currentLayout);
  }
  function onDrop(layout: RGL.Layout[], item: RGL.Layout, e: Event): void {
    item = { ...item, ...DESIoT_AdditionalAttsOfDroppingItem[item.i] };
    const type = item.i;

    const counter = getFieldValue('counter') as number;
    item.i = counter.toString();
    setFieldValue('counter', counter + 1);

    // fix bug draggable when save.
    delete item.isDraggable;
    UIAddItem({ ...item, type, config: DESIoT_ItemDefaultConfig[type] });
  }
};

RGL_UI.defaultProps = {
  className: 'layout',
  rowHeight: 50,
  onLayoutChange: function () {},
};

export default RGL_UI;
