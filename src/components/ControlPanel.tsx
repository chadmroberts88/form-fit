import React from 'react';
import { Switch, Typography } from 'antd';

const { Text } = Typography;

const ControlPanel = ({
  showCamera,
  setShowCamera,
}: {
  showCamera: boolean;
  setShowCamera: (showCamera: boolean) => void;
}): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text>Camera Image:</Text>
      <Switch
        checkedChildren="On"
        unCheckedChildren="Off"
        checked={showCamera}
        onChange={() => {
          setShowCamera(!showCamera);
        }}
      />
    </div>
  );
};

export default ControlPanel;
