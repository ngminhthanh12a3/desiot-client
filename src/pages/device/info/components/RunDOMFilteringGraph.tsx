import { TinyLine } from '@ant-design/charts';
import { Button, Space } from 'antd';
import { min } from 'lodash';
import { FC, useEffect, useRef, useState } from 'react';
import { useRequest } from 'umi';
import { filterLineDataService } from '../service';
const maxGraphLength = 250;
enum SampleModes {
  Sampling,
  Capture,
  Filtering,
  Filtered,
}
enum FilteredStatuses {
  success,
  failed,
}

const sampleModeStrings = ['Sampling', 'Capture', 'Filtering', 'Filtered'];
const filteredStatusStrings = ['success', 'failed'];
const samplingModeBTNCOnfig = {
  0: {
    type: 'primary',
  },
  1: { type: 'primary' },
  2: {
    type: 'primary',
    loading: true,
  },
  3: {
    type: 'default',
  },
};

const RunDOMFilteringGraph: FC<{ itemContent: any }> = ({ itemContent }) => {
  const [curSamplingMode, setCurSamplingMode] = useState(SampleModes.Sampling);
  const [realLineData, setRealLineData] = useState<number[]>([]);
  const [filteredStatus, setFilteredStatus] = useState(FilteredStatuses.success);

  const realLineDataBuffer = useRef<number[]>([]);
  const curSamplingModeIndex = useRef<number>(0);

  const { run: filterCurRealLineDataRun } = useRequest(filterLineDataService, {
    manual: true,
    onSuccess(data, params) {
      console.log(data);
      setRealLineData(data);
      setFilteredStatus(FilteredStatuses.success);
      setCurSamplingMode(SampleModes.Filtered);
    },
    onError() {
      setFilteredStatus(FilteredStatuses.failed);
      setCurSamplingMode(SampleModes.Filtered);
    },
  });
  const preProcessSetRealLineData = () => {
    switch (curSamplingMode) {
      case SampleModes.Sampling:
        setRealLineData(realLineDataBuffer.current);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (typeof itemContent === 'object') {
      const newAdditionalGraphArray = Object.values(itemContent) as number[];

      const newGraphArray = [...realLineDataBuffer.current, ...newAdditionalGraphArray];
      if (newGraphArray.length > maxGraphLength) {
        const shiftedDataLength = newGraphArray.length - maxGraphLength;
        newGraphArray.splice(0, shiftedDataLength);
      }
      realLineDataBuffer.current = newGraphArray;
      preProcessSetRealLineData();
    }
  }, [itemContent]);
  useEffect(() => {
    switch (curSamplingMode) {
      case SampleModes.Filtering:
        filterCurRealLineDataRun(realLineData);
        break;

      default:
        break;
    }

    return () => {};
  }, [curSamplingMode]);

  const onSamplingModeChange = () => {
    curSamplingModeIndex.current++;
    curSamplingModeIndex.current %= sampleModeStrings.length;
    setCurSamplingMode(curSamplingModeIndex.current);

    // if (curSamplingModeIndex.current == SampleModes.Filtering)
    //   setTimeout(() => {
    //     onSamplingModeChange();
    //   }, 2000);
  };
  return (
    <>
      <Space>
        <Button {...samplingModeBTNCOnfig[String(curSamplingMode)]} onClick={onSamplingModeChange}>
          {sampleModeStrings[curSamplingMode]}
          {curSamplingMode === SampleModes.Filtered && ' ' + filteredStatusStrings[filteredStatus]}
        </Button>
      </Space>
      <TinyLine
        data={realLineData}
        animation={false}
        yAxis={{
          minLimit: min(realLineData),
        }}
        smooth
      />
    </>
  );
};

export default RunDOMFilteringGraph;
