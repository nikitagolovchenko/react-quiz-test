// rootReducer - объединяет все редюсеры
import { combineReducers } from 'redux';
import quizReducer from './quiz';

// объект конфигурации = название: название-редюсера
export default combineReducers({
  quiz: quizReducer,
});
