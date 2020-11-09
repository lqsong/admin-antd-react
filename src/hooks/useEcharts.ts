import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import echarts, { ECharts, EChartOption } from 'echarts';
import 'echarts/theme/macarons';

const useEcharts = (
  ref: React.RefObject<any> | React.MutableRefObject<any>,
  initOption: EChartOption,
  theme: string | object = 'macarons',
): ECharts | undefined => {
  const [chart, setChart] = useState<ECharts>();

  useEffect(() => {
    const newChart = echarts.init(ref.current, theme);
    newChart.setOption(initOption);
    setChart(newChart);

    const resizeHandler = debounce(() => {
      newChart.resize();
    }, 100);

    window.addEventListener('resize', resizeHandler);

    return () => {
      newChart.dispose();
      window.removeEventListener('resize', resizeHandler);
    };
  }, [1]);

  return chart;
};

export default useEcharts;
