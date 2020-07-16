import axios from 'axios';

// создаем базовую конфигурацию url, чтобы не писать базовый url в каждом запросе
export default axios.create({
  baseURL: 'https://react-quiz-f2cdd.firebaseio.com',
});
