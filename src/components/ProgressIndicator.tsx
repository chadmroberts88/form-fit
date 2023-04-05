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
  const [count, setCount] = useState<number>(0);
  const [repNumber, setRepNumber] = useState<number>(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [countIntervalId, setCountIntervalId] = useState<NodeJS.Timer>();

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
      if (countIntervalId !== undefined) {
        clearInterval(countIntervalId);
      }
    }

    if (exerciseState === 'START') {
      if (repNumber > reps) setRepNumber(1);
      setCountIntervalId(setInterval(() => setCount((prev) => prev + 1), 1000));
    }

    return () => {
      clearInterval(countIntervalId);
    };
  }, [exerciseState]);

  useEffect(() => {
    if (count > pace) {
      if (repNumber === reps) {
        clearInterval(countIntervalId);
        handleSetExerciseState('STOP');
      }
      setRepNumber((prev) => prev + 1);
      setCount(0);
    }
  }, [count]);

  return (
    <div style={containerStyle}>
      <div style={{ width: '150px', height: '150px' }}>
        <CircularProgressbarWithChildren
          value={(count / pace) * 100}
          text={`${
            repNumber > reps
              ? 'Done'
              : repNumber === 1 && count === 0
              ? 'Ready'
              : repNumber !== 1 && count === 0
              ? 'Reset'
              : count
          }`}
          styles={buildStyles({
            pathTransitionDuration: 0,
          })}
        />
        <div style={{ color: 'black', fontSize: '20px' }}>
          Rep: {repNumber > reps ? repNumber - 1 : repNumber}
        </div>
      </div>
    </div>
  );
};

export default memo(ProgressIndicator);
