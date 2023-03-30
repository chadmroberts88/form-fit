import React from 'react';
import { Button } from 'antd';

interface ExerciseListProps {
  handleSetExercise: (exercise: string) => void;
}

function ExerciseList({ handleSetExercise }: ExerciseListProps): JSX.Element {
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
        onClick={() => handleSetExercise('Seated Shoulder Press')}
      >
        Seated Shoulder Press
      </Button>
      <Button
        type="primary"
        style={buttonStyle}
        onClick={() => handleSetExercise('Lateral Raises')}
      >
        Lateral Raises
      </Button>
    </div>
  );
}

export default ExerciseList;
