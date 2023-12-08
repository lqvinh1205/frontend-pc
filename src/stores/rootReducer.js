import { combineReducers } from 'redux';
import homepageSlice from '../pages/client/homepage/slice';
import appSlice from './app.slice';

const rootReducer = combineReducers({
  app: appSlice,
  homepage: homepageSlice
});

export default rootReducer;
