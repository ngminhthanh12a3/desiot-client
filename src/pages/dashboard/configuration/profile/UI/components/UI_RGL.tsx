import { FC, useState } from 'react';
import RGL, { WidthProvider, Responsive, Layouts } from 'react-grid-layout';
import _ from 'lodash';
import { Card, FormInstance, Layout } from 'antd';
import { UIDataType, UIProps } from '../data';
import DraggableList from './DraggableList';
// import '/node_modules/react-grid-layout/css/styles.css';
// import '/node_modules/react-resizable/css/styles.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
// const { Sider, Content } = Layout;

type UI_RGLProps = UIProps & {
  isDraggable: boolean;
  isResizable: boolean;
  editable: boolean;
  form: FormInstance<UIDataType>;
};

const UI_RGL: FC<UI_RGLProps> = (props) => {
  //   const { onLayoutChange } = props;
  const [layouts, setLayouts] = useState<Layouts>({
    lg: props.form.getFieldValue('initialLayout'),
  });
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');

  return (
    <>
      <div>
        Current Breakpoint: {currentBreakpoint} ({props.cols[currentBreakpoint]} columns)
      </div>
      {/* <Layout>
        {props.editable && (
          <Sider theme="light">
            <DraggableList />
          </Sider>
        )}
        <Content>
        </Content>
      </Layout> */}
      <ResponsiveReactGridLayout
        layouts={layouts}
        {...props}
        onLayoutChange={onLayoutChange}
        // cols={undefined}
        onBreakpointChange={onBreakpointChange}
        compactType={null}
        rowHeight={30}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={false}
        measureBeforeMount={true}
        preventCollision={true}
        isDroppable={true}
        onDrop={onDrop}
        droppingItem={{
          i:
            JSON.stringify({
              text: 'Add item',
              i: layouts[currentBreakpoint]?.length?.toString(),
            }) || '',
          w: 2,
          h: 2,
        }}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </>
  );

  function generateDOM() {
    // console.log(layouts);
    return _.map(layouts[currentBreakpoint], (l: RGL.Layout & { text: string }) => {
      return (
        <div key={l.i}>
          <Card bordered={false} style={{ height: '100%' }} hoverable>
            {l?.text || l.i}
          </Card>
        </div>
      );
    });
  }
  function onBreakpointChange(newBreakpoint: string, newCols: number): void {
    setCurrentBreakpoint(newBreakpoint);
  }
  function onLayoutChange(currentLayout: RGL.Layout[], allLayouts: RGL.Layouts) {
    // setLayouts({ ...layouts });
    // console.log(currentLayout, allLayouts);
    props.onLayoutChange(currentLayout, allLayouts);
  }
  function onDrop(layout: RGL.Layout[], item: RGL.Layout, e: Event) {
    // layout.push(item);
    const itemProps: { text: string; i: string } = JSON.parse(item.i);
    item = { ...item, ...itemProps };
    setLayouts((curLayouts) => ({
      ...curLayouts,
      [currentBreakpoint]: [...curLayouts[currentBreakpoint], item],
    }));
    console.log(itemProps);
  }
};
UI_RGL.defaultProps = {};
export default UI_RGL;
