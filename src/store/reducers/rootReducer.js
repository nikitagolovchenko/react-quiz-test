// rootReducer - объединяет все редюсеры
import { combineReducers } from 'redux';
import quizReducer from './quiz';
import createReducer from './create';
import authReducer from './auth';

// объект конфигурации = название: название-редюсера
export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer,
});
