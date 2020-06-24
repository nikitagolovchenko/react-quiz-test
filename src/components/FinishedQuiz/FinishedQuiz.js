import React from 'react';
import classes from './FinishedQuiz.module.scss';
import Button from '../UI/Button/Button';

const FinishedQuiz = (props) => {
	// получаем количество правильных ответов:
	const successCount = Object.keys(props.results).reduce((total, key) => {
		if (props.results[key] === 'success') {
			total++;
		}

		return total;
	}, 0);

	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{
					// проходимся по всем вопросам:
					props.quiz.map((quizItem, index) => {
						// создаем массив классов:
						const cls = [
							'fa',
							props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
							classes[props.results[quizItem.id]],
						];

						return (
							<li key={index}>
								<strong>{index + 1}</strong>.&nbsp;
								{quizItem.question}
								<i className={cls.join(' ')} />
							</li>
						);
					})
				}
			</ul>

			<p>
				Правильно {successCount} из {props.quiz.length}
			</p>

			<div>
				<Button onClick={props.onRetry} type="primary">Повторить</Button>
				<Button type="success">Перейти в список тестов</Button>
			</div>
		</div>
	);
};

export default FinishedQuiz;
