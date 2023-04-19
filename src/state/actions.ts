import { CameraActions, CameraAction } from '../types';

export const showCamera = (): CameraAction => {
  return {
    type: CameraActions.SHOW_CAMERA,
  };
};

export const hideCamera = (): CameraAction => {
  return {
    type: CameraActions.HIDE_CAMERA,
  };
};
