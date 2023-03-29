import React from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function WorkoutList(): JSX.Element {
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
      <Button type="primary" icon={<UserOutlined />} style={buttonStyle}>
        Seated Shoulder Press
      </Button>
      <Button type="primary" icon={<UserOutlined />} style={buttonStyle}>
        Workout 2
      </Button>
    </div>
  );
}

export default WorkoutList;
