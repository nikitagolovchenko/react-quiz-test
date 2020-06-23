import React from "react";
import styles from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => {

	return (
		<div className={styles.ActiveQuiz}>
			<p className={styles.Question}>
				<span>
					<strong>{props.answerNumber}. </strong>
					{props.question}
				</span>

				<small>{props.answerNumber} из {props.quizLength}</small>
			</p>

			<AnswersList answers={props.answers} state={props.state} onAnswerClick={props.onAnswerClick}/>
		</div>
	);
};

export default ActiveQuiz;
