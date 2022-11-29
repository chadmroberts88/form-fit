import React from 'react';
import { Switch } from 'antd';

const ControlPanel = ({
  showCamera,
  setShowCamera,
}: {
  showCamera: boolean;
  setShowCamera: (showCamera: boolean) => void;
}): JSX.Element => {
  return (
    <div>
      <p>Camera Image</p>
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
