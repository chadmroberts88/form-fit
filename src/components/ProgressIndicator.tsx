import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';

interface ProgressIndicatorProps {
  pace: number;
  exerciseState: string;
  handleSetExerciseState: (exerciseState: string) => void;
}

const containerStyle: React.CSSProperties = {
  width: '80%',
};

const ProgressIndicator = ({
  pace,
  exerciseState,
  handleSetExerciseState,
}: ProgressIndicatorProps): JSX.Element => {
  const [percent, setPercent] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  const colors = [
    '#d1fa6e',
    '#c3f563',
    '#b4ef58',
    '#a5ea4e',
    '#95e543',
    '#84e039',
    '#71da2e',
    '#5bd523',
    '#41cf16',
    '#12ca03',
  ];

  useEffect(() => {
    if (exerciseState === 'STOP') {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    }

    if (exerciseState === 'START') {
      setIntervalId(setInterval(() => setPercent((percent) => percent + 100 / pace), 1000));
    }

    return () => clearInterval(intervalId);
  }, [exerciseState]);

  useEffect(() => {
    if (percent > 100) {
      clearInterval(intervalId);
      handleSetExerciseState('STOP');
      setPercent(0);
    }
  }, [percent]);

  console.log(percent);

  return (
    <div style={containerStyle}>
      <Progress
        steps={pace}
        percent={percent}
        showInfo={false}
        size={[500 / pace, 20]}
        strokeColor={colors.slice(10 - pace, 10)}
      />
    </div>
  );
};

export default ProgressIndicator;
