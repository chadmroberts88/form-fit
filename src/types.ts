export enum WorkoutState {
  START = 'START',
  STOP = 'STOP',
  PAUSE = 'PAUSE',
}

export enum CameraActions {
  SHOW_CAMERA = 'SHOW_CAMERA',
  HIDE_CAMERA = 'HIDE_CAMERA',
}

export interface CameraState {
  showCamera: boolean;
}

export interface CameraAction {
  type: CameraActions;
}
