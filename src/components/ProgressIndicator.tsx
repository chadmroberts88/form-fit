import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';

const containerStyle: React.CSSProperties = {
  width: '80%',
};

const ProgressIndicator = (): JSX.Element => {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((percent) => percent + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={containerStyle}>
      <Progress
        percent={percent}
        showInfo={false}
        size={[600, 30]}
        strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
      />
    </div>
  );
};

export default ProgressIndicator;
