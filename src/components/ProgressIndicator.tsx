import React, { useEffect, useState, memo } from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressIndicatorProps {
  reps: number;
  pace: number;
  exerciseState: string;
  handleSetExerciseState: (exerciseState: string) => void;
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const ProgressIndicator = ({
  reps,
  pace,
  exerciseState,
  handleSetExerciseState,
}: ProgressIndicatorProps): JSX.Element => {
  const [percent, setPercent] = useState<number>(0);
  const [repsComplete, setRepsComplete] = useState<number>(1);
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
      setIntervalId(setInterval(() => setPercent((percent) => percent + 1 / pace), 10));
    }

    return () => clearInterval(intervalId);
  }, [exerciseState]);

  useEffect(() => {
    if (percent > 101) {
      clearInterval(intervalId);
      handleSetExerciseState('STOP');
      setPercent(0);
    }
  }, [percent]);

  console.log(percent);

  return (
    <div style={containerStyle}>
      <div style={{ width: '150px', height: '150px' }}>
        <CircularProgressbarWithChildren
          value={percent}
          text={`${Math.round((percent / 100) * pace)}`}
          styles={buildStyles({
            pathTransitionDuration: 0,
          })}
        />
      </div>
    </div>
  );
};

export default memo(ProgressIndicator);
