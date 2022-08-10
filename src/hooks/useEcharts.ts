import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import * as echarts from 'echarts';

export type EChartsOption = echarts.EChartsOption;

const useEcharts = (
  ref: React.RefObject<HTMLDivElement | HTMLCanvasElement | undefined>,
  initOption: EChartsOption,
  cb?: (ec: echarts.ECharts) => any,
  theme = '',
): {
  echart: echarts.ECharts | undefined;
  cb: (ec: echarts.ECharts) => void;
} => {
  const [chart, setChart] = useState<echarts.ECharts>();

  const callback = (ec: echarts.ECharts) => {
    if (typeof cb === 'function') {
      cb(ec);
    }
  };

  useEffect(() => {
    if (ref.current) {
      const c = echarts.init(ref.current, theme);
      setChart(c);
      c.setOption(initOption);
      callback(c);
    }

    const resizeHandler = debounce(() => {
      chart?.resize();
    }, 100);

    window.addEventListener('resize', resizeHandler);

    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeHandler);
    };
  }, [ref]);

  return {
    echart: chart,
    cb: callback,
  };
};

export default useEcharts;
