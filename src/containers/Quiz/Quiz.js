import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

export default class Quiz extends Component {
	state = {
		isFinished: false,
		results: {}, // {[id]: success/error}
		activeQuestion: 0,
		answerState: null, // информация о текущем клике пользователя (правильный\неправильный ответ) {[id]: 'succes/error'}
		quiz: [
			{
				id: 1,
				question: 'Какого цвета небо?',
				answers: [
					{ id: 1, text: 'Черное' },
					{ id: 2, text: 'Синее' },
					{ id: 3, text: 'Зеленое' },
					{ id: 4, text: 'Красное' },
				],
				rightAnswerId: 2,
			},
			{
				id: 2,
				question: 'Столица Украины?',
				answers: [
					{ id: 1, text: 'Будапешт' },
					{ id: 2, text: 'Валки' },
					{ id: 3, text: 'Киев' },
					{ id: 4, text: 'Харьков' },
				],
				rightAnswerId: 3,
			},
		],
	};

	onAnswerClickHandler = (answerId) => {
		// фикс: проверка чтобы не работали клики если ответ правильный:
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0];

			if (this.state.answerState[key] === 'success') {
				return;
			}
		}

		const question = this.state.quiz[this.state.activeQuestion];
		const results = this.state.results;

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success'; // если ответ правильный - записать success
			}

			this.setState({
				answerState: { [answerId]: 'success' },
				results,
			});

			const timeout = window.setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true,
					});
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null,
					});
				}

				window.clearTimeout(timeout);
			}, 1000);
		} else {
			results[question.id] = 'error'; // если не правильно - записали error

			this.setState({
				answerState: { [answerId]: 'error' },
				results,
			});
		}
	};

	// ф-ция возвращает true если вопросы закончились:
	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	}

	// ф-ция повторного прохождения вопросов - обнуляем результаты:
	retryHandler = () => {
		// стрелочная функция - чтобы не терять контекст this
		this.setState({
			activeQuestion: 0,
			answerState: null,
			isFinished: false,
			results: {},
		});
	};

	componentDidMount() {
		console.log('Quiz ID = ', this.props.match.params.id);
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>

					{this.state.isFinished ? (
						// если вопросы закончились показать компонент:
						<FinishedQuiz
							results={this.state.results}
							quiz={this.state.quiz}
							onRetry={this.retryHandler}
						/>
					) : (
						<ActiveQuiz
							answers={this.state.quiz[this.state.activeQuestion].answers}
							question={this.state.quiz[this.state.activeQuestion].question}
							quizLength={this.state.quiz.length}
							answerNumber={this.state.activeQuestion + 1}
							state={this.state.answerState}
							onAnswerClick={this.onAnswerClickHandler}
						/>
					)}
				</div>
			</div>
		);
	}
}
