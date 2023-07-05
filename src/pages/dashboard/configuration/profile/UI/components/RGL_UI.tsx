import { FC, useRef, useState } from 'react';
import _ from 'lodash';
import RGL, { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { RGL_UIProps } from '../data';
import { Card } from 'antd';
import { useEffect } from 'react';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const RGL_UI: FC<RGL_UIProps> = (props) => {
  const [layouts, setLayouts] = useState<RGL.Layouts>({
    lg: props.form.getFieldValue('initialLayout'),
  });
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');
  const isDraggingNewItem = useRef(false);
  const RRGLRef = useRef<any>();
  return (
    <ResponsiveReactGridLayout
      {...props}
      layouts={layouts}
      onBreakpointChange={onBreakpointChange}
      onLayoutChange={onLayoutChange}
      // WidthProvider option
      measureBeforeMount={false}
      // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
      // and set `measureBeforeMount={true}`.
      useCSSTransforms={true}
      compactType={null}
      preventCollision={true}
      isDraggable={props.editable}
      isResizable={props.editable}
      isDroppable={props.editable}
      onDrop={onDrop}
      onDragStart={(
        layout: Layout[],
        oldItem: Layout,
        newItem: Layout,
        placeholder: Layout,
        event: MouseEvent,
        element: HTMLElement,
      ) => {
        if (event.type === 'dragover') {
          isDraggingNewItem.current = true;
        }
      }}
      droppingItem={{
        i: 'droppingItem' + (layouts[currentBreakpoint] || layouts['lg']).length,
        w: 2,
        h: 2,
      }}
      ref={RRGLRef}
    >
      {generateDOM()}
    </ResponsiveReactGridLayout>
  );

  function onBreakpointChange(newBreakpoint: string, newCols: number) {
    setCurrentBreakpoint(newBreakpoint);
    console.log(newBreakpoint);
  }
  function onLayoutChange(currentLayout: RGL.Layout[], allLayouts: RGL.Layouts) {
    props.onLayoutChange && props.onLayoutChange(currentLayout, allLayouts);
    if (!isDraggingNewItem.current) setLayouts(allLayouts);
  }
  function generateDOM() {
    return _.map(layouts[currentBreakpoint] || layouts['lg'], (l) => {
      return (
        <div key={l?.i}>
          <Card style={{ height: '100%' }}>
            <span className="text">{l?.i}</span>
          </Card>
        </div>
      );
    });
  }
  function onDrop(layout: RGL.Layout[], item: RGL.Layout, e: Event): void {
    item.i = (layout.length - 1).toString();

    // fix bug draggable when save.
    delete item.isDraggable;
    setLayouts((curLayouts) => ({
      ...curLayouts,
      [currentBreakpoint]: [...curLayouts[currentBreakpoint], item],
    }));
    isDraggingNewItem.current = false;
  }
};

RGL_UI.defaultProps = {
  className: 'layout',
  rowHeight: 30,
  onLayoutChange: function () {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
};

export default RGL_UI;
