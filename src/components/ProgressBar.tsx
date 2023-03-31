import React from 'react';

type ProgressBarProps = {
  percent: number;
  showPercent: boolean;
};

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  width: '80%',
};

const barContainerStyle: React.CSSProperties = {
  flex: 1,
  height: '24px',
  width: '100%',
  backgroundColor: '#dfdfe7',
  borderRadius: '12px',
  overflow: 'hidden',
};

const textStyle: React.CSSProperties = {
  marginLeft: '8px',
  width: '42px',
  textAlign: 'right',
};

const barBackgroundStyle: React.CSSProperties = {
  height: 'inherit',
  transition: 'width 2s ease-i-out',
  background: 'linear-gradient(90deg, purple, darkorange)',
};

const barStyle: React.CSSProperties = {
  transition: 'width 2s ease-i-out',
  height: 'inherit',
  borderRadius: 'inherit',
  overflow: 'hidden',
};

const ProgressBar = ({ percent, showPercent }: ProgressBarProps): JSX.Element => {
  const relativePercent = (100 / percent) * 100;

  return (
    <div style={wrapperStyle}>
      <div style={barContainerStyle}>
        <div style={{ width: `${percent}%`, ...barStyle }}>
          <div style={{ width: `${relativePercent}%`, ...barBackgroundStyle }} />
        </div>
      </div>
      {showPercent && <div style={textStyle}>{`${percent}%`}</div>}
    </div>
  );
};

export default ProgressBar;
