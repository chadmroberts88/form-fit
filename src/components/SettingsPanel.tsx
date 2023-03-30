import React, { useRef, useState } from 'react';
import { Button, Modal, Typography, InputNumber } from 'antd';

const { Text, Title } = Typography;

interface SettingsPanelProps {
  exercise: string;
  exerciseState: string;
  handleSetExerciseState: (exerciseState: string) => void;
  handleSetPace: (pace: number) => void;
}

const panelContainerStyle: React.CSSProperties = {
  height: '100%',
};

const panelContentStyle: React.CSSProperties = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  rowGap: '20px',
};

const titleStyle: React.CSSProperties = {
  color: 'black',
  textAlign: 'left',
  marginTop: '0px',
};

const SettingsPanel = ({
  exercise,
  exerciseState,
  handleSetExerciseState,
  handleSetPace,
}: SettingsPanelProps): JSX.Element => {
  const demoVideoRef = useRef<HTMLIFrameElement>(null);
  const timeoutId = useRef<number | undefined>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const embedId =
    exercise === 'Seated Shoulder Press'
      ? 'b8cNbFvBTgE'
      : exercise === 'Lateral Raises'
      ? 'GKoNZ3WXDLM'
      : '';

  const playVideo = (): void => {
    demoVideoRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo' }),
      '*'
    );
  };

  const pauseVideo = (): void => {
    demoVideoRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'pauseVideo' }),
      '*'
    );
  };

  const openModal = (): void => {
    setModalOpen(true);
    timeoutId.current = window.setTimeout(() => {
      playVideo();
    }, 1000);
  };

  const handleCancel = (): void => {
    window.clearTimeout(timeoutId.current);
    timeoutId.current = undefined;
    pauseVideo();
    setModalOpen(false);
  };

  const handlePressStartStop = (): void => {
    if (exerciseState === 'START') {
      handleSetExerciseState('STOP');
    }

    if (exerciseState === 'STOP') {
      handleSetExerciseState('START');
    }
  };

  return (
    <>
      <div style={panelContainerStyle}>
        <Title level={4} style={titleStyle}>
          {exercise}
        </Title>
        <div style={panelContentStyle}>
          <Button onClick={() => openModal()}>Watch Demo</Button>
          <Text>Number of Reps</Text>
          <InputNumber min={1} max={12} defaultValue={1} onChange={(value) => console.log(value)} />
          <Text>Pace</Text>
          <InputNumber
            min={4}
            max={10}
            defaultValue={6}
            onChange={(value) => {
              if (value !== null) handleSetPace(value);
            }}
          />
          <Button onClick={() => handlePressStartStop()}>{`${
            exerciseState === 'START' ? 'Stop' : exerciseState === 'STOP' ? 'Start' : ''
          } Exercise`}</Button>
        </div>
      </div>

      <Modal
        centered
        title={`${exercise} Demo`}
        open={modalOpen}
        footer={null}
        onCancel={() => handleCancel()}
        width={903}
        bodyStyle={{ height: 480 }}
      >
        <iframe
          ref={demoVideoRef}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${embedId}/?enablejsapi=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 0 }}
        />
      </Modal>
    </>
  );
};

export default SettingsPanel;
