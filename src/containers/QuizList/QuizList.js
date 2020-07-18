import React, { Component } from 'react';
import classes from './QuizList.module.scss';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          {/* переход на страницу /quiz/:id */}
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <h1>Список тестов</h1>

        {this.props.loading && this.props.quizes.length !== 0 ? (
          <Loader />
        ) : (
          <ul>{this.renderQuizes()}</ul>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes, // название: state.названиеРедюсера.поле
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()), // название: диспатчим ф-цию,которая возвращает action
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
