import React, { useRef, useState } from 'react';
import { Button, Modal, Typography, InputNumber } from 'antd';

const { Text, Title } = Typography;

interface SettingsPanelProps {
  workout: string;
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

const SettingsPanel = ({ workout }: SettingsPanelProps): JSX.Element => {
  const demoVideoRef = useRef<HTMLIFrameElement>(null);
  const timeoutId = useRef<number | undefined>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const embedId =
    workout === 'Seated Shoulder Press'
      ? 'b8cNbFvBTgE'
      : workout === 'Lateral Raises'
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

  return (
    <>
      <div style={panelContainerStyle}>
        <Title level={4} style={titleStyle}>
          {workout}
        </Title>
        <div style={panelContentStyle}>
          <Button onClick={() => openModal()}>Watch Demo</Button>
          <Text>Number of Reps</Text>
          <InputNumber min={1} max={12} defaultValue={1} onChange={(value) => console.log(value)} />
        </div>
      </div>

      <Modal
        centered
        title={`${workout} Demo`}
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
