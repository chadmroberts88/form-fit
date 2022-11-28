import React, { useRef } from 'react';
import './App.css';
import Webcam from 'react-webcam';
import { Keypoint } from '@tensorflow-models/pose-detection';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

function App() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const SCORE_THRESHOLD = 0.3;

  const runPoseDetection = async () => {
    const model = poseDetection.SupportedModels.MoveNet;
    const config = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER };
    const detector = await poseDetection.createDetector(model, config);
    const adjacentPairs = poseDetection.util.getAdjacentPairs(model);

    setInterval(() => {
      detect(detector, adjacentPairs);
    }, 100);
  };

  const detect = async (detector: poseDetection.PoseDetector, adjacentPairs: number[][]) => {
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

      try {
        const pose = await detector.estimatePoses(video);
        drawSkeleton(pose[0]?.keypoints, adjacentPairs, videoWidth, videoHeight);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const drawSkeleton = (
    keypoints: Keypoint[],
    adjacentPairs: number[][],
    videoWidth: number,
    videoHeight: number
  ) => {
    if (
      typeof canvasRef.current !== undefined &&
      canvasRef.current !== null &&
      keypoints !== undefined &&
      adjacentPairs !== undefined
    ) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      // draw lines
      adjacentPairs.forEach((pair: number[]) => {
        const keypointA: Keypoint = keypoints[pair[0]];
        const keypointB: Keypoint = keypoints[pair[1]];

        const scoreA = keypointA.score !== null ? keypointA.score : 1;
        const scoreB = keypointB.score !== null ? keypointB.score : 1;

        if (
          ctx !== null &&
          scoreA !== undefined &&
          scoreB !== undefined &&
          scoreA >= SCORE_THRESHOLD &&
          scoreB >= SCORE_THRESHOLD
        ) {
          ctx.beginPath();
          ctx.moveTo(keypointA.x, keypointA.y);
          ctx.lineTo(keypointB.x, keypointB.y);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'white';
          ctx.stroke();
        }
      });

      // draw points
      keypoints.forEach((keypoint: Keypoint) => {
        const score = keypoint.score !== null ? keypoint.score : 1;
        const radius = 6;

        if (ctx !== null && score !== undefined && score >= SCORE_THRESHOLD) {
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = setPointColor(keypoint);
          ctx.fill();
        }
      });
    }
  };

  const setPointColor = (keypoint: Keypoint): string => {
    const name: string = keypoint.name ?? '';
    const whitePoints: string[] = ['nose', 'left_eye', 'right_eye', 'left_ear', 'right_ear'];
    const color = whitePoints.includes(name) ? '#FFFFFF' : '#4BB543';
    return color;
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
          // backgroundColor: 'black',
        }}
      />
    </div>
  );
}

export default App;
