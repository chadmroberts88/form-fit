import React from 'react';
import { Button } from 'antd';

interface WorkoutListProps {
  handleSetWorkout: (workout: string) => void;
}

function WorkoutList({ handleSetWorkout }: WorkoutListProps): JSX.Element {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    textAlign: 'left',
    marginBottom: '10px',
    padding: '10px',
  };

  return (
    <div style={containerStyle}>
      <Button
        type="primary"
        style={buttonStyle}
        onClick={() => handleSetWorkout('Seated Shoulder Press')}
      >
        Seated Shoulder Press
      </Button>
      <Button type="primary" style={buttonStyle} onClick={() => handleSetWorkout('Lateral Raises')}>
        Lateral Raises
      </Button>
    </div>
  );
}

export default WorkoutList;
