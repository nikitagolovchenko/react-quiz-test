import React, { Component } from 'react';
import classes from './QuizList.module.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class QuizList extends Component {
  state = {
    quizes: [],
  };

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          {/* переход на страницу /quiz/:id */}
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://react-quiz-f2cdd.firebaseio.com/quizes.json'
      );

      const quizes = [];

      // перебор объекта по ключам:
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });

      this.setState({
        quizes,
      });

      console.log(this.state);

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <h1>Список тестов</h1>

        <ul>{this.renderQuizes()}</ul>
      </div>
    );
  }
}
