import { configureStore } from '@reduxjs/toolkit';
import { cameraReducer } from './reducers';

export default configureStore({
  reducer: {
    camera: cameraReducer,
  },
});
