import React from 'react';
import styles from './FinishedQuiz.module.scss';

const FinishedQuiz = (props) => {
	// получаем количество правильных ответов:
	const successCount = Object.keys(props.results).reduce((total, key) => {
		if (props.results[key] === 'success') {
			total++;
		}

		return total;
	}, 0);

	return (
		<div className={styles.FinishedQuiz}>
			<ul>
				{
					// проходимся по всем вопросам:
					props.quiz.map((quizItem, index) => {
						// создаем массив классов:
						const cls = [
							'fa',
							props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
							styles[props.results[quizItem.id]],
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
				<button onClick={props.onRetry}>Повторить</button>
			</div>
		</div>
	);
};

export default FinishedQuiz;
