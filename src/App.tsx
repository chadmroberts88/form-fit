import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import { grey } from './colors';
import './App.css';

import Canvas from './components/Canvas';
import ControlPanel from './components/ControlPanel';
import WorkoutList from './components/WorkoutList';
import SettingsPanel from './components/SettingsPanel';
import ProgressIndicator from './components/ProgressIndicator';

const { Sider, Content } = Layout;
const { Title } = Typography;

const titleStyle: React.CSSProperties = {
  color: 'black',
  textAlign: 'left',
  marginTop: '0px',
};

const siderStyle: React.CSSProperties = {
  backgroundColor: `${grey[2]}`,
};

const siderContainerStyle: React.CSSProperties = {
  height: '100%',
  padding: '20px',
};

const siderContentStyle: React.CSSProperties = {
  height: 'calc(100% - 40px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const contentStyle: React.CSSProperties = {
  height: '100%',
  minHeight: '580px',
  backgroundColor: '#282c34',
};

const canvasContainerStyle: React.CSSProperties = {
  minHeight: '480px',
  height: 'calc(100% - 100px)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const timerContainerStyle: React.CSSProperties = {
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function App() {
  const [showCamera, setShowCamera] = useState<boolean>(true);
  const [selectedWorkout, setSelectedWorkout] = useState<string>('Seated Shoulder Press');

  const handleSetWorkOut = (workout: string): void => {
    setSelectedWorkout(workout);
  };

  return (
    <div className="App">
      <Layout>
        <Sider width="260px" style={siderStyle}>
          <div style={siderContainerStyle}>
            <Title level={4} style={titleStyle}>
              Select Workout
            </Title>
            <div style={siderContentStyle}>
              <WorkoutList handleSetWorkout={handleSetWorkOut} />
              <ControlPanel showCamera={showCamera} setShowCamera={setShowCamera} />
            </div>
          </div>
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <div style={canvasContainerStyle}>
              <Canvas showCamera={showCamera} />
            </div>
            <div style={timerContainerStyle}>
              <ProgressIndicator />
            </div>
          </Content>
        </Layout>
        <Sider width="260px" style={siderStyle}>
          <div style={siderContainerStyle}>
            <div style={siderContentStyle}>
              <SettingsPanel workout={selectedWorkout} />
            </div>
          </div>
        </Sider>
      </Layout>
    </div>
  );
}

export default App;
