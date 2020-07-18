import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
} from './actionTypes';

// ассинхронный action:
export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get('/quizes.json');

      const quizes = [];

      // перебор объекта по ключам:
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

// action creators:

// при старте загрузки с сервера:
export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

// при успешной загрузке с сервера:
export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

// при ошибке загрузки с сервера:
export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}
