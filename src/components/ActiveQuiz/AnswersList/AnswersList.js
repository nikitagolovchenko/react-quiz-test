import React from "react";
import styles from "./AnswersList.module.scss";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => (
	<ul className={styles.AnswersList}>
		{props.answers.map((answer, index) => {
      
			return (
				<AnswerItem
					answer={answer}
          onAnswerClick={props.onAnswerClick}
          state={props.state ? props.state[answer.id] : null} // проверка
					key={index}
				/>
			);
		})}
	</ul>
);

export default AnswersList;
