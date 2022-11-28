import React, { useRef } from 'react';
import './App.css';
import Webcam from 'react-webcam';
import { Keypoint } from '@tensorflow-models/pose-detection';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

function App() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runPoseDetection = async () => {
    const model = poseDetection.SupportedModels.MoveNet;
    const config = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER };
    const detector = await poseDetection.createDetector(model, config);

    setInterval(() => {
      detect(detector);
    }, 100);
  };

  const detect = async (detector: poseDetection.PoseDetector) => {
    if (
      typeof webcamRef.current !== undefined &&
      webcamRef.current !== null &&
      webcamRef.current.video !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video: HTMLVideoElement = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await detector.estimatePoses(video);
      drawKeypoints(pose[0]?.keypoints, videoWidth, videoHeight);
    }
  };

  const drawKeypoints = (keypoints: Keypoint[], videoWidth: number, videoHeight: number) => {
    if (
      typeof canvasRef.current !== undefined &&
      canvasRef.current !== null &&
      keypoints !== undefined
    ) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      keypoints.forEach((keypoint: Keypoint) => {
        const score = keypoint.score !== null ? keypoint.score : 1;
        const scoreThreshold = 0.3;

        if (ctx !== null && score !== undefined && score >= scoreThreshold) {
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, 6, 0, 2 * Math.PI);
          ctx.fillStyle = '#4BB543';
          ctx.fill();
        }
      });
    }
  };

  runPoseDetection();

  return (
    <div className="App">
      <Webcam
        id="video"
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          height: 480,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'white',
        }}
      />
    </div>
  );
}

export default App;
