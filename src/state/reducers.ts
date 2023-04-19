import { CameraActions, CameraAction, CameraState } from '../types';

const initialCameraState: CameraState = {
  showCamera: false,
};

export const cameraReducer = (state: CameraState = initialCameraState, action: CameraAction) => {
  switch (action.type) {
    case CameraActions.SHOW_CAMERA:
      return {
        ...state,
        showCamera: true,
      };
    case CameraActions.HIDE_CAMERA:
      return {
        ...state,
        showCamera: false,
      };
    default:
      return state;
  }
};
